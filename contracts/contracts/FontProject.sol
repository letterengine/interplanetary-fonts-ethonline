// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./InterPlanetaryFontNFT.sol";

contract FontProject {
  InterPlanetaryFontNFT private fontNFT = new InterPlanetaryFontNFT();
  
  mapping(bytes32 => CreateFontProject) public idToFontProject;

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

    uint256 royaltyInstantDistributionId;
    // uint256[] fundingStreamIds; TBD

    uint256 createdAt;
    uint256 startDateTime;
  }

  function createNewFontProject(
    uint256 createdAt,
    uint256 startDateTime,
    uint256 mintPrice,
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

    idToFontProject[fontId] = CreateFontProject(
        fontId,
        metaDataCID,
        msg.sender,
        mintPrice,
        mints,
        collaborators,
        0,
        createdAt,
        startDateTime
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

    require(font.startDateTime == 0, "FONT NOT FOUND");
    require(msg.value == font.mintPrice, "NOT ENOUGH ETH SENT");


    uint256 tokenId = fontNFT.safeMint(msg.sender, uri);
    font.mints.push(tokenId);

    emit FontProjectMinted(
      fontId,
      tokenId
    );
  }
}
