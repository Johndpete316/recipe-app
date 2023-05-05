import * as dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

dotenv.config();

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID!,
    },
    region: process.env.AWS_REGION,
});


type SizeMap = {
    [key: string]: { width: number; height?: number };
};

async function resizeImage(file: Buffer, size: string): Promise<Buffer> {
    const sizeMap: SizeMap = {
        'thumbnail': { width: 50, height: 50 },
        'small': { width: 100 },
        'medium': { width: 300 },
        'large': { width: 600 },
    };

    const resizeParams = sizeMap[size] || { width: 100 };
    const resizedImage = await sharp(file).resize(resizeParams).toBuffer();
    return resizedImage;
}



// file buffer from post, key storage location / file name, env test or prod
export async function uploadFIleToS3(file: Express.Multer.File, key: string, storage_path: string): Promise<{ thumbnail: string, small: string, medium: string, large: string }> {
    const imageSize = ['thumbnail', 'small', 'medium', 'large'];
    const bucket = process.env.AWS_BUCKET_NAME_TEST!;
    
    const baseParams = {
        Bucket: bucket,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
    };

    try {
        const results: { [key: string]: string } = {};

        const promises = imageSize.map(async (size) => {
            const resizedImage = await resizeImage(file.buffer, size);
            const params = {
                ...baseParams,
                Body: resizedImage,
                Key: `${storage_path}/${size}/${key}`,
            };
            await s3Client.send(new PutObjectCommand(params));
            results[size] = `https://${bucket}.s3.amazonaws.com/${storage_path}/${size}/${key}`;
        });

        await Promise.all(promises);

        return {
            thumbnail: results['thumbnail'],
            small: results['small'],
            medium: results['medium'],
            large: results['large'],
        };

    } catch (err) {
        throw err;
    }
}

