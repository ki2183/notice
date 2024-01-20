export type noticeTextType = {
    text:string
}
export type noticeImgType = {
    img:File
}


export type noticeArr = Array<noticeTextType|noticeImgType>
