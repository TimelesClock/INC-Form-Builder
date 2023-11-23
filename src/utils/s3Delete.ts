import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3Client";

const extractBucketAndKey = (url: string) => {
    const urlParts = new URL(url);
    const bucket = urlParts.hostname.split('.')[0];
    let key = urlParts.pathname.substring(1); // Remove the leading '/'
    key = decodeURIComponent(key);

    return { bucket, key };
};

const deleteFromS3 = async (url: string) => {
    const { bucket, key } = extractBucketAndKey(url);

    const params = {
        Bucket: bucket,
        Key: key,
    };

    try {
        const command = new DeleteObjectCommand(params);
        const response = await s3Client.send(command);
        return response; // Contains information about the deletion
    } catch (error) {
        console.error("Error deleting object from S3:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}

export default deleteFromS3;
