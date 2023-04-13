import type { DeleteFileType, GetUploadedFileType, UploadStreamDescriptorType } from "@medusajs/medusa"
import { AbstractFileService } from "@medusajs/medusa"
import { createReadStream } from "fs"
import ImgurClient from "imgur"
import { Stream } from "stream"

type UploadFile = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

class ImgurService extends AbstractFileService {
  client: ImgurClient
  imgurEndpoint: string
  // eslint-disable-next-line no-empty-pattern
  constructor({ }, options: {
    clientId: string,
    clientSecret: string,
  }) {
    super({}, options)

    this.imgurEndpoint = 'https://api.imgur.com/3/'
    this.client = new ImgurClient({
      clientId: options.clientId,
      clientSecret: options.clientSecret,
    })
  }

  /**
   * The super types are wrong
   */
  // @ts-ignore
  upload(fileData: UploadFile) {
    return this.uploadFile(fileData)
  }

  /**
   * The super types are wrong
   */
  // @ts-ignore
  uploadProtected(file: UploadFile) {
    return this.uploadFile(file)
  }

  uploadFile(file: UploadFile) {
    return new Promise((resolve, reject) => {
      this.client.upload({
        image: createReadStream(file.path),
        type: 'stream',
      }).then((image) => {
        resolve({ url: image.data.link, key: image.data.deletehash })
      }).catch((err) => {
        reject(err)
      })
    })
  }

  async delete(file: DeleteFileType) {
    return new Promise<void>((resolve, reject) => {
      this.client.deleteImage(`${file}`).then(() => {
        return resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }

  async getUploadStreamDescriptor(fileData: UploadStreamDescriptorType) {
    const pass = new Stream.PassThrough()
    const fileKey = `${fileData.name}.${fileData.ext}`


    return {
      writeStream: pass,
      promise: this.client.upload({
        image: pass,
        type: "stream"
      }),
      url: `${this.imgurEndpoint}/${fileKey}`,
      fileKey,
    }
  }

  async getDownloadStream(fileData: GetUploadedFileType) {
    const image = await this.client.getImage(fileData.fileKey)
    return createReadStream(image.data.link)
  }

  async getPresignedDownloadUrl(fileData: GetUploadedFileType) {
    const image = await this.client.getImage(fileData.fileKey)

    return image.data.link
  }
}

export default ImgurService
