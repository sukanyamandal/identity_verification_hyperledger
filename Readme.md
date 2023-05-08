# Identity Verification DApp

This repository contains a decentralized application (DApp) for identity verification using Hyperledger Fabric. The DApp consists of a chaincode (smart contract) for managing identity records on the blockchain and a client application to interact with the chaincode.

## Prerequisites

Ensure the following tools are installed on your system:

-   [Node.js](https://nodejs.org/en/download/) (v14.x or later)
-   [npm](https://www.npmjs.com/get-npm) (included with Node.js)
-   [Docker](https://www.docker.com/products/docker-desktop) (v17.06.2 or later)
-   [Docker Compose](https://docs.docker.com/compose/install/) (v1.14.0 or later)
-   [Git](https://git-scm.com/downloads)

## Repository Structure


    `identity-verification-dapp/
    |
    ├── chaincode/
    |   ├── identity_verification/
    |   |   ├── identity_verification.js
    |   |   └── package.json
    |
    ├── client/
    |   ├── identity_verification_client/
    |   |   ├── app.js
    |   |   ├── package.json
    |   |   └── wallet/
    |
    fabric-samples/
        └── test-network/
            ├── ...
            └── organizations/
                └── ...`

 

## Setup

1.  **Clone the `fabric-samples` repository**
    
    Open your terminal and run:
    
    `git clone https://github.com/hyperledger/fabric-samples.git` 
    
    This will download the Hyperledger Fabric samples including the test network.
    
2.  **Download the required binaries and Docker images**
    
    Change to the `fabric-samples/test-network` directory:
    
    `cd fabric-samples/test-network` 
    
    Then, run the following command:
    
    `./network.sh download` 
    
3.  **Install chaincode dependencies**
    
    Navigate to the `chaincode/identity_verification` directory in the `identity-verification-dapp` repository:
    
    `cd path_to_identity-verification-dapp/chaincode/identity_verification` 
    
    Then, install the chaincode dependencies:
    
    `npm install` 
    
4.  **Install client application dependencies**
    
    Navigate to the `client/identity_verification_client` directory in the `identity-verification-dapp` repository:
    
    `cd path_to_identity-verification-dapp/client/identity_verification_client` 
    
    Then, install the client application dependencies:
    
    `npm install` 
    

## Deploying the DApp

1.  **Start the test network**
    
    Navigate to the `fabric-samples/test-network` directory:
    
    `cd path_to_fabric-samples/test-network` 
    
    Then, start the test network:
    
    `./network.sh up` 
    
2.  **Create a channel and join the peers**
    
    Run the following commands to create a new channel and join the peers to it:
    
    `./network.sh createChannel -c mychannel`

    `/network.sh joinChannel -c mychannel` 
    
3.  **Package, install, and initialize the chaincode**
    
    Package and install the chaincode, approve the chaincode definition, and commit the chaincode definition to the channel:
    
    `./network.sh deployCC -ccn identity_verification -ccp ../chaincode/identity_verification -ccl node -cci initLedger` 
    
    Replace `-ccp` with the path to the directory containing your `identity_verification.js` chaincode file.
    
4.  **Test the DApp**
    
    Navigate to the `client/identity_verification_client` directory in the`identity-verification-dapp` repository:

`cd path_to_identity-verification-dapp/client/identity_verification_client` 

5.  **Register and enroll the application user**

Before running the client application, you'll need to register and enroll a user with the Certificate Authority (CA) for the organization. Run the `registerUser.js` script to register a new user called "appUser":

`node registerUser.js` 

This script will generate a new `appUser` identity and store it in the `wallet` directory.

6.  **Interact with the chaincode using the client application**

Use the `app.js` script in the `identity_verification_client` directory to interact with the chaincode. You can modify this script to call different chaincode functions and pass different arguments.

For example, you can test the `createIdentity`, `getIdentity`, `updateIdentity`, `verifyIdentity`, and `deleteIdentity` functions by modifying the `app.js` file and invoking the corresponding chaincode functions with appropriate arguments.

After modifying the `app.js` script, run the client application:

`node app.js` 

The output will display the results of the executed chaincode function, such as the creation of an identity, retrieval of identity details, or the verification status of an identity.

7.  **Shutdown the test network**

Once you have finished testing the DApp, navigate to the `fabric-samples/test-network` directory and run the following command to shutdown the test network and clean up the environment:

`./network.sh down`