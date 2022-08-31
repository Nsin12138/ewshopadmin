import request from "@/utils/request";
/**
 * @description: 评价列表
 * @param params
 * */
// 评价列表
export function comments(data){
    return request(
        {
            url:'/api/admin/comments',
            method:'GET',
            data,
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





