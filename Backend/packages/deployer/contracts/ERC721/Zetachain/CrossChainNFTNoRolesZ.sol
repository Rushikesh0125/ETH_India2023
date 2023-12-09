// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@zetachain/protocol-contracts/contracts/evm/interfaces/ZetaInterfaces.sol";
import "@zetachain/protocol-contracts/contracts/evm/tools/ZetaInteractor.sol";

interface CrossChainErrors {
    error InvalidMessageType();

    error InvalidTransferCaller();

    error ErrorApprovingZeta();
}

contract CrossChainNFTZ is 
    ERC721Enumerable, 
    ERC721URIStorage, 
    ERC721Burnable, 
    Ownable,
    ZetaInteractor,
    ZetaReceiver, 
    CrossChainErrors
{

    using Strings for uint256;

    bytes32 private CROSS_CHAIN_TRANSFER_MESSAGE;
    bytes32 private CROSS_CHAIN_MINT;

    string public uri;

    uint256 public chainId;
    uint256 private maxTokens;
    uint256 private tokenId;
    uint256 private noOfChains;
    uint256 public sequenceNumber;

    ZetaTokenConsumer private immutable _zetaConsumer;
    IERC20 internal immutable _zetaToken;

    constructor(
        address connectorAddress,
        address zetaTokenAddress,
        address zetaConsumerAddress,
        string memory name, 
        string memory symbol, 
        string memory _uri, 
        uint256 _maxSupply, 
        uint256 _chainId, 
        uint256 seed, 
        uint256 _noOfChains
    )
        ERC721(name, symbol)
        Ownable()
        ZetaInteractor(connectorAddress)
    {
        chainId = _chainId;
        uri = _uri;
        maxTokens = _maxSupply;
        tokenId = seed;
        noOfChains = _noOfChains;
        _zetaToken = IERC20(zetaTokenAddress);
        _zetaConsumer = ZetaTokenConsumer(zetaConsumerAddress);
        CROSS_CHAIN_TRANSFER_MESSAGE = keccak256("CROSS_CHAIN_TRANSFER");
        CROSS_CHAIN_MINT = keccak256("CROSS_CHAIN_MINT");
    }

    function safeMint(address to)
        public
    {   
        require(sequenceNumber <= maxTokens, "Minting cap reached");
        uint256 currentTokenId;
        if(sequenceNumber== 0){
            currentTokenId = tokenId;
        }else{
            tokenId += noOfChains;
            currentTokenId = tokenId;
        }
        sequenceNumber++;
        _safeMint(to, currentTokenId);
        _setTokenURI(currentTokenId, uri);
    }

    function transferOwnership(address _owner) public override(Ownable, Ownable2Step){
        super._transferOwnership(_owner);
    }

    function _transferOwnership(address _owner) internal override(Ownable, Ownable2Step){
        super._transferOwnership(_owner);
    }

    function _beforeTokenTransfer(address from, address to, uint256 _tokenId_, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, _tokenId_, batchSize);
    }

    function _burn(uint256 amount) internal override(ERC721, ERC721URIStorage){
        super._burn(amount);
    }

    function mint(address to) internal {
        require(sequenceNumber <= maxTokens, "Minting cap reached");
        uint256 currentTokenId;
        if(sequenceNumber == 0){
            currentTokenId = tokenId;
        }else{
            tokenId += noOfChains;
            currentTokenId = tokenId;
        }
        sequenceNumber++;
        _safeMint(to, currentTokenId);
        _setTokenURI(currentTokenId, uri);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(_tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function crossChainTransfer(
        uint256 crossChainId,
        address to,
        uint256 _tokenId_
    ) external payable {
        if (!_isValidChainId(crossChainId)) revert InvalidDestinationChainId();
        if (!_isApprovedOrOwner(_msgSender(), _tokenId_))
            revert InvalidTransferCaller();

        uint256 crossChainGas = 2 * (10 ** 18);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{
            value: msg.value
        }(address(this), crossChainGas);
        _zetaToken.approve(address(connector), zetaValueAndGas);

        _burn(_tokenId_);

        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: crossChainId,
                destinationAddress: interactorsByChainId[crossChainId],
                destinationGasLimit: 500000,
                message: abi.encode(
                    CROSS_CHAIN_TRANSFER_MESSAGE,
                    _tokenId_,
                    msg.sender,
                    to
                ),
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }

     function crossChainMint(
        uint256 crossChainId,
        address to,
        uint256 _tokenId_
    ) external payable {
        if (!_isValidChainId(crossChainId)) revert InvalidDestinationChainId();
        if (!_isApprovedOrOwner(_msgSender(), _tokenId_))
            revert InvalidTransferCaller();

        uint256 crossChainGas = 2 * (10 ** 18);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{
            value: msg.value
        }(address(this), crossChainGas);
        _zetaToken.approve(address(connector), zetaValueAndGas);


        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: crossChainId,
                destinationAddress: interactorsByChainId[crossChainId],
                destinationGasLimit: 500000,
                message: abi.encode(
                    CROSS_CHAIN_TRANSFER_MESSAGE,
                    _tokenId_,
                    address(0),
                    to
                ),
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }


    function onZetaMessage(
        ZetaInterfaces.ZetaMessage calldata zetaMessage
    ) external override isValidMessageCall(zetaMessage) {
        (
            bytes32 messageType,
            uint256 _tokenId_,
            ,
            address to
        ) = abi.decode(
                zetaMessage.message,
                (bytes32, uint256, address, address)
            );

        if (messageType != CROSS_CHAIN_TRANSFER_MESSAGE || messageType != CROSS_CHAIN_MINT)
            revert InvalidMessageType();

        _safeMint(to, _tokenId_);
        _setTokenURI(_tokenId_, uri);
    }

    function onZetaRevert(
        ZetaInterfaces.ZetaRevert calldata zetaRevert
    ) external override isValidRevertCall(zetaRevert) {
        (bytes32 messageType, uint256 _tokenId_, address from, ) = abi.decode(
            zetaRevert.message,
            (bytes32, uint256, address, address)
        );

        if (messageType == CROSS_CHAIN_MINT){
            revert("Mint failed on Destination chain");
        } else if(messageType == CROSS_CHAIN_TRANSFER_MESSAGE){
            _safeMint(from, _tokenId_);
            _setTokenURI(_tokenId_, uri);
        }else{
            revert InvalidMessageType();
        }
        
    }
}
