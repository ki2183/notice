
export type arrNotice = Array<noticeTypeTEXT | noticeTypeIMG>

export type noticeTypeTEXT = {
    text:string
}

export type noticeTypeIMG = {
    name:string
    url:string
}

export const initialText = {
    text:''
}
