import request from "@/utils/request";
/**
 * @description: 评价列表
 * @param params
 * */
// 评价列表
export function comments(params:any){
    return request(
        {
            url:'/api/admin/comments',
            method:'GET',
            params,
        }
    );
}


// 评价详情
export  function getCommentInfo(commentid) {
    return request(
        {
            url: `/api/admin/comments/${commentid}`,
            method: 'GET',
        }
    );
}


// 回复评价
export  function getCommentReply(commentid) {
    return request(
        {
            url: `/api/admin/category/${commentid}/reply`,
            method: 'PATCH',
        }
    );
}





