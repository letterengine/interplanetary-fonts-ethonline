// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./InterPlanetaryFontNFT.sol";

import {ISuperfluid, ISuperToken, SuperAppBase, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import {IInstantDistributionAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import {IDAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";

contract FontProject {
  InterPlanetaryFontNFT private fontNFT = new InterPlanetaryFontNFT();

  /// @notice IDA Library
  using IDAv1Library for IDAv1Library.InitData;
  IDAv1Library.InitData internal _idaV1;
  
  mapping(bytes32 => CreateFontProject) public idToFontProject;

  uint32 private currentIDAIndex;

  constructor(ISuperfluid _host) {
    // IDA Library Initialize.
    _idaV1 = IDAv1Library.InitData(
        _host,
        IInstantDistributionAgreementV1(
            address(
                _host.getAgreementClass(
                    keccak256(
                        "org.superfluid-finance.agreements.InstantDistributionAgreement.v1"
                    )
                )
            )
        )
    );
  }

  event NewFontProjectCreated(
    bytes32 fontId,
    string metaDataCID,
    address creatorAddress,
    uint256 mintPrice,
    uint256 createdAt,
    uint256 startDateTime
  );

  event FontProjectMinted(
    bytes32 fontId,
    uint256 tokenId
  );

  struct CreateFontProject {
    bytes32 id;
    string metaDataCID;
    address creatorAddress;
    uint256 mintPrice;
    uint256[] mints;
    address[] collaborators;

    ISuperToken idaDistributionToken;
    uint32 royaltyIDAIndex;
    // uint256[] fundingStreamIds; TBD

    uint256 createdAt;
    uint256 startDateTime;
  }

  function createNewFontProject(
    uint256 createdAt,
    uint256 startDateTime,
    uint256 mintPrice,
    ISuperToken idaDistributionToken,
    string calldata metaDataCID
  ) external {
    bytes32 fontId = keccak256(
        abi.encodePacked(
            msg.sender,
            address(this),
            createdAt,
            startDateTime,
            mintPrice
        )
    );

    require(idToFontProject[fontId].startDateTime == 0, "FONT IS ALREADY REGISTERED");

    uint256[] memory mints;
    address[] memory collaborators;

    currentIDAIndex = currentIDAIndex + 1;

    CreateFontProject memory font = CreateFontProject(
        fontId,
        metaDataCID,
        msg.sender,
        mintPrice,
        mints,
        collaborators,
        idaDistributionToken,
        currentIDAIndex,
        createdAt,
        startDateTime
    );
    idToFontProject[fontId] = font;

    _idaV1.updateSubscriptionUnits(
      font.idaDistributionToken,
      font.royaltyIDAIndex,
      msg.sender,
      60
    );

    emit NewFontProjectCreated(
      fontId,
      metaDataCID, 
      msg.sender,
      mintPrice, 
      createdAt,
      startDateTime
    );
  }


  function mintFontProject(
    bytes32 fontId,
    string memory uri
  ) external payable {
    CreateFontProject storage font = idToFontProject[fontId];

    require(font.startDateTime != 0, "FONT NOT FOUND");
    require(msg.value == font.mintPrice, "NOT ENOUGH ETH SENT");


    uint256 tokenId = fontNFT.safeMint(msg.sender, uri);
    font.mints.push(tokenId);

    // TODO - distribute earnings to collaborators

    emit FontProjectMinted(
      fontId,
      tokenId
    );
  }

  function indexOf(uint256[] memory arr, uint256 searchFor) private pure returns (uint256) {
    for (uint256 i = 0; i < arr.length; i++) {
      if (arr[i] == searchFor) {
        return i;
      }
    }
    revert("NOT FOUND");
  }

  function setFontCollaboratorProfitDistribution(bytes32 fontId, uint128 distributionUnits) public {
    CreateFontProject memory font = idToFontProject[fontId];

    require(font.startDateTime != 0, "FONT NOT FOUND");
    require(font.creatorAddress == msg.sender, "ONLY FONT CREATOR CAN UPDATE COLLABORATOR PROFIT DISTRIBUTION");

    for (uint256 i = 0; i < font.collaborators.length; i++) {
      _idaV1.updateSubscriptionUnits(
        font.idaDistributionToken,
        font.royaltyIDAIndex,
        font.collaborators[i],
        distributionUnits
      );
    }
  }

  function distributeFontProfit(bytes32 fontId) public {
    CreateFontProject memory font = idToFontProject[fontId];

    require(font.startDateTime != 0, "FONT NOT FOUND");

    uint256 spreaderTokenBalance = font.idaDistributionToken.balanceOf(address(this));

    (uint256 actualDistributionAmount, ) = _idaV1.ida.calculateDistribution(
        font.idaDistributionToken,
        address(this),
        font.royaltyIDAIndex,
        spreaderTokenBalance
    );

    _idaV1.distribute(font.idaDistributionToken, font.royaltyIDAIndex, actualDistributionAmount);
  }
}
