export interface PostInfoModel {
    _id: string,
    url: string,
    title:string;
    imageUrl: string,
    description: string,
    author: string,
    _acl: { creator: string }
}