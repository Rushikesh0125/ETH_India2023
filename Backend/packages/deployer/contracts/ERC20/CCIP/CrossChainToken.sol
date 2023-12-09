// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";


contract CrossChainToken is ERC20, ERC20Burnable, Ownable, CCIPReceiver {

    bytes32 private CROSS_CHAIN_TRANSFER_MESSAGE;
    bytes32 private CROSS_CHAIN_MINT;
    bytes32 private s_lastReceivedMessageId; 

    address private MINTER;

    uint256 private maxTokens;

    mapping(uint64 => bool) public allowlistedDestinationChains;
    mapping(uint64 => bool) public allowlistedSourceChains;
    mapping(address => bool) public allowlistedSenders;

    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees); 
    error NothingToWithdraw(); 
    error FailedToWithdrawEth(address owner, address target, uint256 value); 
    error DestinationChainNotAllowlisted(uint64 destinationChainSelector); 
    error SourceChainNotAllowlisted(uint64 sourceChainSelector); 
    error SenderNotAllowlisted(address sender); 

    event MessageSent(
        bytes32 indexed messageId, 
        uint64 indexed destinationChainSelector, 
        address receiver, 
        bytes32 msg, 
        address feeToken, 
        uint256 fees 
    );

    event MessageReceived(
        bytes32 indexed messageId, 
        uint64 indexed sourceChainSelector, 
        address sender, 
        bytes32 msg
    );

    modifier onlyAllowlisted(uint64 _sourceChainSelector, address _sender) {
        if (!allowlistedSourceChains[_sourceChainSelector])
            revert SourceChainNotAllowlisted(_sourceChainSelector);
        if (!allowlistedSenders[_sender]) revert SenderNotAllowlisted(_sender);
        _;
    }

    modifier onlyAllowlistedDestinationChain(uint64 _destinationChainSelector) {
        if (!allowlistedDestinationChains[_destinationChainSelector])
            revert("Invalid destination");
        _;
    }

    modifier onlyMinter() {
        require(msg.sender == MINTER);
        _;
    }


    constructor(
        address _router, 
        address _minter, 
        string memory _name,
        string memory _symbol
    )
        ERC20(_name, _symbol)
        Ownable()
        CCIPReceiver(_router)
    {
        CROSS_CHAIN_TRANSFER_MESSAGE =keccak256("CROSS_CHAIN_TRANSFER");
        CROSS_CHAIN_MINT = keccak256("CROSS_CHAIN_MINT");
        MINTER = _minter;
    }

    function allowlistDestinationChain(
        uint64 _destinationChainSelector,
        bool allowed
    ) external onlyOwner {
        allowlistedDestinationChains[_destinationChainSelector] = allowed;
    }

    function allowlistSourceChain(
        uint64 _sourceChainSelector,
        bool allowed
    ) external onlyOwner {
        allowlistedSourceChains[_sourceChainSelector] = allowed;
    }

    function allowlistSender(address _sender, bool allowed) external onlyOwner {
        allowlistedSenders[_sender] = allowed;
    }

    function setMinter(address _minter) public onlyOwner {
        MINTER = _minter;
    }

    function mint(address to, uint256 amount) public onlyMinter {
        _mint(to, amount);
    }

    function transferCrossChain(
        uint64 _destinationChainSelector,
        uint256 _amount,
        address to
    )
        external
        onlyOwner
        onlyAllowlistedDestinationChain(_destinationChainSelector)
        returns (bytes32 messageId)
    {
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(
            address(this),
            abi.encode(CROSS_CHAIN_TRANSFER_MESSAGE, to, _amount),
            address(0)
        );

        IRouterClient router = IRouterClient(this.getRouter());

        uint256 fees = router.getFee(_destinationChainSelector, evm2AnyMessage);

        if (fees > address(this).balance)
            revert NotEnoughBalance(address(this).balance, fees);

        messageId = router.ccipSend{value: fees}(
            _destinationChainSelector,
            evm2AnyMessage
        );

        _burn(msg.sender, _amount);

        emit MessageSent(
            messageId,
            _destinationChainSelector,
            address(this),
            CROSS_CHAIN_TRANSFER_MESSAGE,
            address(0),
            fees
        );

    }

    function crossChainMint(
        uint64 _destinationChainSelector,
        address to,
        uint256 _amount
    ) public onlyAllowlistedDestinationChain(_destinationChainSelector)
        returns(bytes32 messageId)
    {
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(address(this)),
            data: abi.encode(CROSS_CHAIN_MINT, to, _amount),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV1({gasLimit: 200_000, strict: false})
            ),
            feeToken:address(0)
        });

        IRouterClient router = IRouterClient(this.getRouter());

        uint256 fees = router.getFee(_destinationChainSelector, message);

        if (fees > address(this).balance)
            revert NotEnoughBalance(address(this).balance, fees);

        messageId = router.ccipSend{value: fees}(
            _destinationChainSelector,
            message
        );

        emit MessageSent(
            messageId,
            _destinationChainSelector,
            address(this),
            CROSS_CHAIN_MINT,
            address(0),
            fees
        );
    }

    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    )
        internal
        override
        onlyAllowlisted(
            any2EvmMessage.sourceChainSelector,
            abi.decode(any2EvmMessage.sender, (address))
        ) 
    {
        s_lastReceivedMessageId = any2EvmMessage.messageId;
        (bytes32 msgType, address to, uint256 _amount) = abi.decode(any2EvmMessage.data, (bytes32, address, uint256));
        
        if(msgType == CROSS_CHAIN_TRANSFER_MESSAGE){
            _mint(to, _amount);
        }else if(msgType == CROSS_CHAIN_MINT){
            _mint(to, _amount);
        }else{
            revert("Invalid CCM");
        }
        emit MessageReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector, 
            abi.decode(any2EvmMessage.sender, (address)), 
            msgType
        ); 
    }

    function _buildCCIPMessage(
        address _receiver,
        bytes memory _dataToSend,
        address _feeTokenAddress
    ) internal pure returns (Client.EVM2AnyMessage memory) {
        
        return
            Client.EVM2AnyMessage({
                receiver: abi.encode(_receiver),
                data: _dataToSend, 
                tokenAmounts: new Client.EVMTokenAmount[](0), 
                extraArgs: Client._argsToBytes(
                    Client.EVMExtraArgsV1({gasLimit: 2500_000, strict: false})
                ),
                feeToken: _feeTokenAddress
            });
    }
}

