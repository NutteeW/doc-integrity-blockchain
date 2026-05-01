// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DocVerifier {
    
    struct Document {
        bytes32 hash;
        uint256 timestamp;
        address uploader;
        string fileName;
    }

    mapping(bytes32 => Document) private documents;
    bytes32[] public allHashes;

    event DocumentRegistered(
        bytes32 indexed hash,
        address indexed uploader,
        string fileName,
        uint256 timestamp
    );

    // บันทึก Hash ของเอกสาร
    function registerDocument(bytes32 _hash, string memory _fileName) public {
        require(documents[_hash].timestamp == 0, "Document already registered");
        
        documents[_hash] = Document({
            hash: _hash,
            timestamp: block.timestamp,
            uploader: msg.sender,
            fileName: _fileName
        });

        allHashes.push(_hash);
        emit DocumentRegistered(_hash, msg.sender, _fileName, block.timestamp);
    }

    // ตรวจสอบเอกสาร
    function verifyDocument(bytes32 _hash) public view returns (
        bool exists,
        uint256 timestamp,
        address uploader,
        string memory fileName
    ) {
        Document memory doc = documents[_hash];
        if (doc.timestamp == 0) {
            return (false, 0, address(0), "");
        }
        return (true, doc.timestamp, doc.uploader, doc.fileName);
    }

    // ดูจำนวนเอกสารทั้งหมด
    function getTotalDocuments() public view returns (uint256) {
        return allHashes.length;
    }
}