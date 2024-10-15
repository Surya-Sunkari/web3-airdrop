# Project Instructions

## Contract Deployment

To deploy the Airdrop contract, use the following command (this is what I use, but I setup some foundry settings in the past):

```bash
forge create ./src/Airdrop.sol:Airdrop --rpc-url wss://ethereum-sepolia-rpc.publicnode.com --account deployer
```

### Additional Steps (if needed)

You may need to follow the general deployment steps from [Foundry's official documentation](https://book.getfoundry.sh/forge/deploying) if the previous command doesnt work. Here's an example command:

```bash
$ forge create --rpc-url <your_rpc_url> --private-key <your_private_key> src/MyContract.sol:MyContract
```

### Important

- **Save the contract address**: After deployment, make sure to note down the contract address as it will be required in the frontend.

---

## Frontend

### Create a `.env` File

You will need to create a `.env` file in the root of your project and add the `NEXT_PUBLIC_TEMPLATE_CLIENT_ID` from [thirdweb](https://thirdweb.com/). The `.env` file should look like this:

```bash
NEXT_PUBLIC_TEMPLATE_CLIENT_ID=<your_client_id>
```

### Launch the Local Development Server

Run the following command to start the local development server:

```bash
yarn install (to install the packages)
yarn dev (to run the server)
```

### Update Contract Address in Frontend

If a new contract is deployed, update the contract address in the frontend code:

- Open `src/page.tsx`
- Replace the old contract address with the newly deployed one.

---