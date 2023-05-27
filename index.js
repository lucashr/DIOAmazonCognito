const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { 
    DynamoDBDocumentClient,
    PutCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

exports.handler = async(event) => {

    let responseBody = ""
    let statusCode = 0


    let {id, price} = JSON.parse(event.body);
    
    const newItem = {
        id: id,
        price: price
    }
    
    try {
        

        await dynamo.send(
                new PutCommand({
                    TableName: "DIOItems",
                    Item: {
                        id: id,
                        price: price
                    },
                })
            );
                
        statusCode = 200
        responseBody = JSON.stringify('Item inserido com sucesso!')
        
    } catch (err) {
        statusCode = 200
        responseBody = JSON.stringify(err)
    }
    
    const response = {
        statusCode: statusCode,
        body: responseBody,
    }
            
    return response;
       
};