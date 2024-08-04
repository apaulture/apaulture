# Azure Storage

## Generate SAS token and connection string
1. Go to storage account
2. Expand security + networking section
3. Select **Shared access signature**
4. Set parameters
5. Select **Generate SAS and connection string**

## Retrieve directory objects from Azure Files
File share: `Container` resource type must be checked
```pwsh
az storage file list `
    --account-name <account name>`
    --share-name `
    [--account-key|--sas-token|--connection-string] <creds>
```

## Retrieve blobs from contaier in Azure Blob Storage
`Server`, `Container`, and `Object` resource types must be checked
```pwsh
az storage blob list `
    --account-name <account name> `
    [--account-key|--sas-token|--connection-string] <creds> `
    [--container/-c] <container name>
```
> Ensure to pass in the credential flag prior to `--container` as the container flag will begin sending REST requests, triggering warning or error messages unless a valid SAS token or connection string is first passed in.