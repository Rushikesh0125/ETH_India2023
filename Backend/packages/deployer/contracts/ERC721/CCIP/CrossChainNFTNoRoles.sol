// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";


contract CrossChainNFTNoRoles is ERC721Enumerable, ERC721URIStorage, ERC721Burnable, CCIPReceiver, Ownable {

    using Strings for uint256;

    bytes32 private CROSS_CHAIN_TRANSFER_MESSAGE;
    bytes32 private CROSS_CHAIN_MINT;
    bytes32 private s_lastReceivedMessageId; 

    string public uri;

    uint256 public chainId;
    uint256 private maxTokens;
    uint256 private tokenId;
    uint256 private noOfChains;

    uint256 public sequenceNumber;

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

    constructor(
        address _router,
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
        CCIPReceiver(_router)
    {
        chainId = _chainId;
        uri = _uri;
        maxTokens = _maxSupply;
        tokenId = seed;
        noOfChains = _noOfChains;
        CROSS_CHAIN_TRANSFER_MESSAGE =keccak256("CROSS_CHAIN_TRANSFER");
        CROSS_CHAIN_MINT = keccak256("CROSS_CHAIN_MINT");
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

    function safeMint(address to)
        public
    {   
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
        pure
        override(ERC721, CCIPReceiver, ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function transferCrossChain(
        uint64 _destinationChainSelector,
        uint256 _tokenId,
        address to
    )
        external
        onlyOwner
        onlyAllowlistedDestinationChain(_destinationChainSelector)
        returns (bytes32 messageId)
    {
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(
            address(this),
            abi.encode(CROSS_CHAIN_TRANSFER_MESSAGE, to, _tokenId),
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

        burn(_tokenId);

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
        address to
    ) public onlyAllowlistedDestinationChain(_destinationChainSelector)
        returns(bytes32 messageId)
    {
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(address(this)),
            data: abi.encode(CROSS_CHAIN_MINT, to, 0),
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
        (bytes32 msgType, address to, uint256 _tokenId) = abi.decode(any2EvmMessage.data, (bytes32, address, uint256));
        
        if(msgType == CROSS_CHAIN_TRANSFER_MESSAGE){
            _safeMint(to, _tokenId);
            _setTokenURI(_tokenId, uri);
        }else if(msgType == CROSS_CHAIN_MINT){
            mint(to);
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
