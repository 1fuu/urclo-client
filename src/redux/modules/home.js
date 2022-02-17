const ADD_CLOTHES_TOGGLE = 'home/ADD_CLOTHES_TOGGLE';
const WRITE_POST_TOGGLE = 'home/WRITE_POST_TOGGLE';
const CLOTHES_TOGGLE = 'home/CLOTHES_TOGGLE';
const FORUM_TOGGLE = 'home/FORUM_TOGGLE';
const POST_TOGGLE = 'home/POST_TOGGLE';
const CHAT_TOGGLE = 'home/CHAT_TOGGLE';
const MESSAGE_TOGGLE = 'home/MESSAGE_TOGGLE';
const ALARM_TOGGLE = 'home/ALARM_TOGGLE';
const SET_ITEMLIST = 'home/SET_ITEMLIST';
const SET_POSTLIST = 'home/SET_POSTLIST';
const SET_CHATLIST = 'home/SET_CHATLIST';
const SET_CURRENT_ITEM = 'home/SET_CURRENT_ITEM';
const SET_CURRENT_POST = 'home/SET_CURRENT_POST';
const SET_CURRENT_CHAT = 'home/SET_CURRENT_CHAT';
const ADD_CHAT_MESSAGE = 'home/ADD_CHAT_MESSAGE';
const SET_ALARM_TEXT = 'home/SET_ALARM_TEXT';
const LOADING_STATE_CHANGE = 'home/LOADING_STATE_CHANGE';

export const AddClothesToggle = (aVisible) => ({ 
    type: ADD_CLOTHES_TOGGLE,
    aVisible
});

export const WritePostToggle = (wVisible) => ({ 
    type: WRITE_POST_TOGGLE,
    wVisible
});

export const ClothesToggle = (cVisible) => ({ 
    type: CLOTHES_TOGGLE,
    cVisible
});

export const ForumToggle = (fVisible) => ({ 
    type: FORUM_TOGGLE,
    fVisible
});

export const PostToggle = (pVisible) => ({ 
    type: POST_TOGGLE,
    pVisible
});

export const ChatToggle = (crVisible) => ({ 
    type: CHAT_TOGGLE,
    crVisible
});

export const MessageToggle = (mVisible) => ({ 
    type: MESSAGE_TOGGLE,
    mVisible
});

export const AlarmToggle = (alVisible) => ({ 
    type: ALARM_TOGGLE,
    alVisible
});

export const SetItemList = (itemList) => ({
    type: SET_ITEMLIST,
    itemList
})

export const SetPostList = (postList) => ({
    type: SET_POSTLIST,
    postList
})

export const SetChatList = (chatList) => ({
    type: SET_CHATLIST,
    chatList
})

export const SetCurrentItem = (iID, title, details, sellerID, sellerNick, location, type, price, imgname) => ({
    type: SET_CURRENT_ITEM,
    itemInfo: {
        iID,
        title,
        details,
        sellerID,
        sellerNick,
        location,
        type,
        price,
        imgname
    }
})

export const SetCurrentPost = (pID, title, context, writer, comments, createdAt) => ({
    type: SET_CURRENT_POST,
    postInfo: {
        pID,
        title,
        context,
        writer,
        comments,
        createdAt
    }
})

export const SetCurrentChat = (cID, iID, title, price, imgname, seller, buyer, sellerNick, buyerNick, messages, createdAt) => ({
    type: SET_CURRENT_CHAT,
    chatInfo: {
        cID,
        iID,
        title,
        price,
        imgname,
        seller,
        buyer,
        sellerNick,
        buyerNick,
        messages,
        createdAt
    }
})

export const AddChatMessage = (username, text, date) => ({ 
    type: ADD_CHAT_MESSAGE,
    messageInfo: {
        username,
        text,
        date
    }
});

export const SetAlarmText = (alarmText) => ({
    type: SET_ALARM_TEXT,
    alarmText
});

export const LoadingStateChange = (loading, success, error) => ({ 
    type: LOADING_STATE_CHANGE,
    loadingState: {
        loading,
        success,
        error
    }
});


const initialState = {
    itemList: [],
    postList: [],
    chatList: [],
    aVisible: false,
    wVisible: false,
    cVisible: false,
    fVisible: false,
    pVisible: false,
    crVisible: false,
    mVisible: false,
    alVisible: false,
    alarmText: "",
    loadingState: {
        loading: false,
        success: false,
        error: null
    },
    currentItem: {
        iID: 0,
        title: "",
        details: "",
        sellerID: "",
        sellerNick: "",
        location: "",
        type: "",
        price: "",
        imgname: ""
    },
    currentPost: {
        pID: 0,
        title: "",
        context: "",
        writer: "",
        comments: [],
        createdAt: ""
    },
    currentChat: {
        cID: 0,
        iID: 0,
        title: "",
        price: "",
        imgname: "",
        seller: "",
        buyer: "",
        sellerNick: "",
        buyerNick: "",
        messages: [],
        createdAt: ""
    }
};

export default function home(state = initialState, action) {
    switch (action.type) {
        case ADD_CLOTHES_TOGGLE:
            return {
                ...state,
                aVisible: action.aVisible
            };
        case WRITE_POST_TOGGLE:
            return {
                ...state,
                wVisible: action.wVisible
            };
        case CLOTHES_TOGGLE:
            return {
                ...state,
                cVisible: action.cVisible
            };
        case FORUM_TOGGLE:
            return {
                ...state,
                fVisible: action.fVisible
            };
        case POST_TOGGLE:
            return {
                ...state,
                pVisible: action.pVisible
            };
        case CHAT_TOGGLE:
            return {
                ...state,
                crVisible: action.crVisible
            };
        case MESSAGE_TOGGLE:
            return {
                ...state,
                mVisible: action.mVisible
            };
        case ALARM_TOGGLE:
            return {
                ...state,
                alVisible: action.alVisible
            };
        case SET_ITEMLIST:
            console.log(action);
            return {
                ...state,
                itemList: action.itemList.map(item => item)
            };
        case SET_POSTLIST:
            console.log(action);
            return {
                ...state,
                postList: action.postList.map(post => post)
            };
        case SET_CHATLIST:
            console.log(action);
            return {
                ...state,
                chatList: action.chatList.map(chat => chat)
            };
        case SET_CURRENT_ITEM:
            console.log(action);
            return {
                ...state,
                currentItem: {
                    iID: action.itemInfo.iID,
                    title: action.itemInfo.title,
                    details: action.itemInfo.details,
                    sellerID: action.itemInfo.sellerID,
                    sellerNick: action.itemInfo.sellerNick,
                    location: action.itemInfo.location,
                    type: action.itemInfo.type,
                    price: action.itemInfo.price,
                    imgname: action.itemInfo.imgname
                }
            }
        case SET_CURRENT_POST:
            return {
                ...state,
                currentPost: {
                    pID: action.postInfo.pID,
                    title: action.postInfo.title,
                    context: action.postInfo.context,
                    writer: action.postInfo.writer,
                    comments: action.postInfo.comments.map(comment => comment),
                    createdAt: action.postInfo.createdAt
                }
            }
        case SET_CURRENT_CHAT:
            return {
                ...state,
                currentChat: {
                    cID: action.chatInfo.cID,
                    iID: action.chatInfo.iID,
                    title: action.chatInfo.title,
                    price: action.chatInfo.price,
                    imgname: action.chatInfo.imgname,
                    seller: action.chatInfo.seller,
                    buyer: action.chatInfo.buyer,
                    sellerNick: action.chatInfo.sellerNick,
                    buyerNick: action.chatInfo.buyerNick,
                    messages: action.chatInfo.messages.map(comment => comment),
                    createdAt: action.chatInfo.createdAt
                }
            }
        case ADD_CHAT_MESSAGE:
            return {
                ...state,
                currentChat: {
                    ...state.currentChat,
                    messages: [
                        ...state.currentChat.messages,
                        {
                            username: action.messageInfo.username,
                            text: action.messageInfo.text,
                            date: action.messageInfo.date
                        }
                    ]
                }
            }
        case SET_ALARM_TEXT:
            return {
                ...state,
                alarmText: action.alarmText
            }
        case LOADING_STATE_CHANGE:
            console.log(action);
            return {
                ...state,
                loadingState: {
                    loading: action.loadingState.loading,
                    success: action.loadingState.success,
                    error: action.loadingState.error
                }
            }
        default:
            return state;
    }
};