import { fromJS } from 'immutable';

const defaultState = fromJS({
    topicList: [
        {
            id: 1,
            name: "社会",
            imgUrl: "https://upload.jianshu.io/users/upload_avatars/9988193/fc26c109-1ae6-4327-a298-2def343e9cd8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp"
        },
        {
            id: 2,
            name: "美妆博主",
            imgUrl: "https://upload.jianshu.io/users/upload_avatars/3343569/6940ee65-036f-4b7a-9935-5915d9b67d14.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp"
        }
    ],
    articleList: [
        {
            id: 1,
            title: "“因为10个口罩，我看到了妻子的另一面，终止了两年的婚外恋”",
            content: "01 作家詹迪·尼尔森曾说：“遇见灵魂伴侣的感觉，就好像是走进一座你曾经住过的房子里——你认识那些家具，认识墙上的画，架上的书，抽屉里的东西：如...",
            imgUrl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3085411638,2868007544&fm=26&gp=0.jpg"
        },
        {
            id: 2,
            title: "检验婚姻最好的标准:睡觉!",
            content: "有人说： “真正的爱情不是海誓山盟，而是潜藏在细枝末节的小事中。” 的确，很多时候，从日常生活的细节，就能看出一段感情是否美满，一段婚姻是否能够.",
            imgUrl: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3782948058,2269227305&fm=26&gp=0.jpg"
        }
    ],
    recommendList: [
        {
            id: 1,
            imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583349221094&di=a6b8e548d454a2b6104d63fc2ef7896c&imgtype=0&src=http%3A%2F%2Fp2.ifengimg.com%2Fa%2F2018_13%2Fb5d1efb73c45794_size105_w1024_h683.jpg"
        },
        {
            id: 2,
            imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583349263660&di=6f89b432d364cebc4b6194d92f3b3b97&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1701%2F859-1F103110A5.jpg"
        },
        {
            id: 3,
            imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583349276821&di=f2092a8fa209e3c966b5ba897692319c&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1680210977%2C1409368160%26fm%3D214%26gp%3D0.jpg"
        }
    ]
});

export default (state=defaultState, action) => {
    switch(action.type){
        default:
            return state;
    }
}