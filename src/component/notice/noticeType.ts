
export type arrNotice = Array<noticeTypeTEXT | noticeTypeIMG>

export type noticeTypeTEXT = {
    text:string
}
export type noticeTypeIMG = {
    img:File
}

export const initialText = {
    text:''
}
