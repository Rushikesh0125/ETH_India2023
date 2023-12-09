// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@zetachain/protocol-contracts/contracts/evm/interfaces/ZetaInterfaces.sol";
import "@zetachain/protocol-contracts/contracts/evm/tools/ZetaInteractor.sol";

interface CrossChainErrors {
    error InvalidMessageType();

    error InvalidTransferCaller();

    error ErrorApprovingZeta();
}

contract CrossChainTokenZ is ERC20, ERC20Burnable, Ownable, ZetaInteractor, ZetaReceiver, CrossChainErrors {

    bytes32 private CROSS_CHAIN_TRANSFER_MESSAGE;
    bytes32 private CROSS_CHAIN_MINT_MESSAGE;

    ZetaTokenConsumer private immutable _zetaConsumer;
    IERC20 internal immutable _zetaToken;

    address private MINTER;

    uint256 private tokenCount;

    modifier onlyMinter() {
        require(msg.sender == MINTER);
        _;
    }

    constructor( 
        address connectorAddress, 
        address zetaTokenAddress,
        address zetaConsumerAddress, 
        address _minter, 
        string memory _name,
        string memory _symbol
    )
        ERC20(_name, _symbol)
        Ownable()
        ZetaInteractor(connectorAddress)
    {
        CROSS_CHAIN_TRANSFER_MESSAGE =keccak256("CROSS_CHAIN_TRANSFER");
        CROSS_CHAIN_MINT_MESSAGE = keccak256("CROSS_CHAIN_MINT");
        _zetaToken = IERC20(zetaTokenAddress);
        _zetaConsumer = ZetaTokenConsumer(zetaConsumerAddress);
        MINTER = _minter;
    }

    function setMinter(address _minter) public onlyOwner {
        MINTER = _minter;
    }

    function mint(address to, uint256 amount) public onlyMinter {
        require(tokenCount <= totalSupply(), "Exceeds supply");
        _mint(to, amount);
    }

    function transferOwnership(address _owner) public override(Ownable, Ownable2Step){
        super._transferOwnership(_owner);
    }

    function _transferOwnership(address _owner) internal override(Ownable, Ownable2Step){
        super._transferOwnership(_owner);
    }

    function crossChainMint(
        uint256 crossChainId,
        address to,
        uint256 amount
    ) external onlyMinter payable{
        if (!_isValidChainId(crossChainId)) revert("Invalid destination chain contract");

        uint256 crossChainGas = 2 * (10 ** 18);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{ value: msg.value }(
            address(this),
            crossChainGas
        );
        _zetaToken.approve(address(connector), zetaValueAndGas);

        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: crossChainId,
                destinationAddress: interactorsByChainId[crossChainId],
                destinationGasLimit: 500000,
                message: abi.encode(CROSS_CHAIN_MINT_MESSAGE, amount, address(0), to),
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }

    function crossChainTransfer(
        uint256 crossChainId,
        address to,
        uint256 amount
    ) external payable {
        require(balanceOf(msg.sender) > amount, "Not enough balance");
        if (!_isValidChainId(crossChainId)) revert("Invalid destination chain contract");

        uint256 crossChainGas = 2 * (10 ** 18);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{ value: msg.value }(
            address(this),
            crossChainGas
        );
        _zetaToken.approve(address(connector), zetaValueAndGas);

        _burn(msg.sender, amount);

        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: crossChainId,
                destinationAddress: interactorsByChainId[crossChainId],
                destinationGasLimit: 500000,
                message: abi.encode(CROSS_CHAIN_TRANSFER_MESSAGE, amount, msg.sender, to),
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }

    function onZetaMessage(ZetaInterfaces.ZetaMessage calldata zetaMessage) external override isValidMessageCall(zetaMessage) {
        (bytes32 messageType, uint256 amount, , address to) = abi.decode(
            zetaMessage.message,
            (bytes32, uint256, address, address)
        );

        if (messageType != CROSS_CHAIN_TRANSFER_MESSAGE || messageType != CROSS_CHAIN_MINT_MESSAGE) revert InvalidMessageType();

        if(tokenCount+amount > totalSupply()) revert("exceeds totalSupply");

        _mint(to, amount);
    }

    function onZetaRevert(ZetaInterfaces.ZetaRevert calldata zetaRevert) external override isValidRevertCall(zetaRevert) {
        (bytes32 messageType, uint256 amount, address from, ) = abi.decode(
            zetaRevert.message,
            (bytes32, uint256, address, address)
        );

        if(messageType == CROSS_CHAIN_MINT_MESSAGE) revert("Mint failed on dest");

        if (messageType != CROSS_CHAIN_TRANSFER_MESSAGE) revert("Invalid cross chain message");

        _mint(from, amount);
    }
}

