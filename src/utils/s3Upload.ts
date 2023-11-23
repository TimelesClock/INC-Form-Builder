import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from './s3Client';

const getPublicUrl = (bucket: string, region: string, key: string) => {
    const encodedKey = encodeURIComponent(key);
    return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
};

const uploadToS3 = async (bucket: string, key: string, body: Buffer, mimeType: string,filename:string) => {
    const params = {
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentEncoding: 'base64',
        ContentType: mimeType,
        ContentDisposition: `attachment; filename="${filename}"`
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        const region = process.env.NEXT_PUBLIC_AWS_REGION ?? 'ap-southeast-1';

        return getPublicUrl(bucket, region, key);
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};

export default uploadToS3;
