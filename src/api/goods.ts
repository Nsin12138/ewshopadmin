import request from "@/utils/request";
/**
 * @description: 商品列表
 * @param params
 * */
// 商品列表
export function goods(params:any){
    return request(
        {
            url:'/api/admin/goods',
            method:'GET',
            params,
        }
    );
}

// 添加商品
export  function addGood(data) {
    return request(
        {
            url: '/api/admin/goods',
            method: 'POST',
            data,
        }
    );
}

// 商品详情
export  function getGoodInfo(goodid) {
    return request(
        {
            url: `/api/admin/users/${goodid}`,
            method: 'GET',
        }
    );
}


// 修改商品
export  function changeGood(goodid, data) {
    return request(
        {
            url: `/api/admin/users/${goodid}`,
            method: 'PUT',
            data
        }
    );
}


// 上架和下架
export  function getGoodLock(userid) {
    return request(
        {
            url: `/api/admin/users/${userid}/on`,
            method: 'PATCH',
        }
    );
}

// 推荐和不推荐
export  function recommendGood(goodid) {
    return request(
        {
            url: `/api/admin/users/${goodid}`,
            method: 'PATCH',

        }
    );
}