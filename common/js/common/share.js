export default {
    data() {
        return {
            share_info: {
                title: '',
                kds: '',
                desc: '',
                path: '',
                query: '',
                img: '',
                video: ''
            }
        }
    },

    onShareAppMessage() {
        var app = getApp();
        var share = app.globalData.share_content_handle(this.share_info || {});
        var data = {
            title: share.title,
            desc: share.desc,
            path: share.path + share.query
        }
        if (app.globalData.data.is_share_use_image == 1) {
            data['imageUrl'] = share.img;
        }
        return data;
    },
    onShareTimeline() {
        var app = getApp();
        var share = app.globalData.share_content_handle(this.share_info || {});
        var data = {
            title: share.title,
            query: ((share.query || null) != null && share.query.substr(0, 1) == '?') ? share.query.slice(1) : share.query
        };
        if (app.globalData.data.is_share_use_image == 1) {
            data['imageUrl'] = share.img;
        }
        return data;
    }
}