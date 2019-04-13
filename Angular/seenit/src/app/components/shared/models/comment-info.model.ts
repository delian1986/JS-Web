export interface CommentInfoModel {
    _id: string;
    content: string;
    author: string;
    _acl: { creator: string };
}