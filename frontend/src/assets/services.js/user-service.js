import { storageService } from "../services.js/async-storage.service.js"
import { utilService } from "../services.js/util.service.js"
import { httpService } from "./http.service.js"

const STORAGE_KEY = "userDB"
const AUTH_KEY = "authDB"

export const userService = {
  query,
  update,
  updateUsers,
  fetchCurrentUser,
}

export const gUsers = [
  {
    id: "Z550",
    username: "Liori",
    password: "123456",
    fullname: "Lior Maor",
    bio: "Happiness depends upon ourselves",
    imgUrl:
      "https://res.cloudinary.com/dsinv9pik/image/upload/v1674477174/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_vsrinc.jpg",
    following: [
      {
        id: "Z580",
        fullname: "Ulashi Ulashi",
        imgUrl: "https://img.mako.co.il/2014/02/24/467424241_g.jpg",
      },
      {
        id: "u103",
        fullname: "Eli Mor",
        imgUrl: "https://shorturl.at/adGH1",
      },
    ],
    followers: [
      {
        id: "B700",
        fullname: "Dob Moran",
        imgUrl:
          "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
      },
      {
        id: "C600",
        fullname: "Maria Pali",
        imgUrl: "https://randomuser.me/api/portraits/women/31.jpg",
      },
    ],
    savedStoryIds: [],
    isNewNotifications: true,
    notifications: [
      {
        id: utilService.makeId(),
        type: "Dob Moran like your story",
        by: {
          id: "B700",
          fullname: "Dob Moran",
          imgUrl:
            "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
        },
      },
      {
        id: utilService.makeId(),
        type: "Maria Pali started follow you",
        written: false,
        by: {
          id: "C600",
          fullname: "Maria Pali",
          imgUrl: "https://randomuser.me/api/portraits/women/31.jpg",
        },
      },
    ],
    messages: [
      {
        room: "123",
        otherUserId: "B700",
        list: [
          {
            timestamp: "8:45",
            fullname: "Lior Maor",
            avatar: "https://res.cloudinary.com/dsinv9pik/image/upload/v1674477174/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_vsrinc.jpg",
            message: "Hayush",
          },
          {
            timestamp: "8:47",
            fullname: "Dob Moran",
            avatar: "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
            message: "מה המצב",
          },
        ],
      },
      {
        room: "425",
        otherUserId: "Z580",
        list: [
          {
            timestamp: "1:45",
            fullname: "Lior Maor",
            avatar: "https://res.cloudinary.com/dsinv9pik/image/upload/v1674477174/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_vsrinc.jpg",
            message: "אז אתה מתחיל איתי?",
          },
          {
            timestamp: "3:33",
            fullname: "Ulashi Ulashi",
            avatar: "https://img.mako.co.il/2014/02/24/467424241_g.jpg",
            message: "איפפפ את עפה על עצמך! תעשה פרסה מותק!",
          },
        ],
      }
    ],
  },
  {
    id: "A550",
    username: "Muko",
    password: "123456",
    fullname: "Muko Muka",
    bio: "We’re all born naked and the rest is drag",
    imgUrl:
      "https://media.cnn.com/api/v1/images/stellar/prod/230111041545-01-dani-alves-brazil-112822.jpg?c=original",
    following: [
      {
        id: "B700",
        fullname: "Dob Moran",
        imgUrl:
          "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
      },
      {
        id: "C600",
        fullname: "Maria Pali",
        imgUrl: "https://randomuser.me/api/portraits/women/31.jpg",
      },
      {
        id: "u103",
        fullname: "Eli Mor",
        imgUrl: "https://shorturl.at/adGH1",
      },
    ],
    followers: [
      {
        id: "B700",
        fullname: "Dob Moran",
        imgUrl:
          "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
      },
      {
        id: "C600",
        fullname: "Maria Pali",
        imgUrl: "https://randomuser.me/api/portraits/women/31.jpg",
      },
    ],
    savedStoryIds: [],
    isNewNotifications: false,
    notifications: [
      {
        id: utilService.makeId(),
        type: "like your story",
        written: false,
        by: {
          id: "C600",
          fullname: "Maria Pali",
          imgUrl: "https://randomuser.me/api/portraits/women/31.jpg",
        },
      },
    ],
    messages: [],
  },
  {
    id: "B700",
    username: "Dob Moran",
    password: "123456",
    fullname: "Dob Moran",
    bio: "Change will not come if we wait for some other person or some other time",
    imgUrl:
      "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
    following: [
      {
        id: "C600",
        fullname: "Dob Moran",
        imgUrl: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      {
        id: "u102",
        fullname: "Leo Dicaprio",
        imgUrl: "https://tinyurl.com/bddwcp58",
      },
    ],
    followers: [
      {
        id: "C600",
        fullname: "Dob Moran",
        imgUrl: "https://randomuser.me/api/portraits/men/75.jpg",
      },
    ],
    savedStoryIds: [],
    isNewNotifications: false,
    notifications: [
      {
        id: utilService.makeId(),
        type: "like your story",
        by: {
          id: "C600",
          fullname: "Maria Pali",
          imgUrl: "https://randomuser.me/api/portraits/women/31.jpg",
        },
      },
    ],
    messages: [
      {
        room: "123",
        otherUserId: "Z550",
        list: [
          {
            timestamp: "8:45",
            fullname: "Lior Maor",
            avatar: "https://res.cloudinary.com/dsinv9pik/image/upload/v1674477174/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_vsrinc.jpg",
            message: "Hayush",
          },
          {
            timestamp: "8:47",
            fullname: "Dob Moran",
            avatar: "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
            message: "מה המצב",
          },
        ],
      }
    ],
  },
  {
    id: "C600",
    username: "Maria",
    password: "123456",
    fullname: "Maria Pali",
    bio: "You can be the lead in your own life",
    imgUrl: "https://randomuser.me/api/portraits/women/31.jpg",
    following: [
      {
        id: "B700",
        fullname: "Dob Moran",
        imgUrl:
          "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
      },
    ],
    followers: [
      {
        id: "B700",
        fullname: "Dob Moran",
        imgUrl:
          "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
      },
    ],
    savedStoryIds: [],
    isNewNotifications: false,
    notifications: [],
    messages: [],
  },
  {
    id: "Z580",
    username: "Ulashi",
    password: "123456",
    fullname: "Ulashi Ulashi",
    bio: "If you don’t like the road you’re walking, start paving another one",
    imgUrl: "https://img.mako.co.il/2014/02/24/467424241_g.jpg",
    following: [
      {
        id: "B700",
        fullname: "Dob Moran ",
        imgUrl:
          "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
      },
      {
        id: "C600",
        fullname: "Maria Pali",
        imgUrl: "https://randomuser.me/api/portraits/women/31.jpg",
      },
    ],
    followers: [
      {
        id: "B700",
        fullname: "Dob Moran",
        imgUrl:
          "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
      },
    ],
    savedStoryIds: [],
    isNewNotifications: false,
    notifications: [],
    messages: [
      {
        room: "425",
        otherUserId: "Z550",
        list: [
          {
            timestamp: "1:45",
            fullname: "Lior Maor",
            avatar: "https://res.cloudinary.com/dsinv9pik/image/upload/v1674477174/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_vsrinc.jpg",
            message: "אז אתה מתחיל איתי?",
          },
          {
            timestamp: "3:33",
            fullname: "Ulashi Ulashi",
            avatar: "https://img.mako.co.il/2014/02/24/467424241_g.jpg",
            message: "איפפפ את עפה על עצמך! תעשה פרסה מותק!",
          },
        ],
      }
    ],
  },
  {
    id: "u102",
    username: "lea1",
    password: "123456",
    fullname: "lea di",
    bio: "Imagination is more important than knowledge",
    imgUrl: "https://tinyurl.com/bddwcp58",
    following: [
      {
        id: "u103",
        fullname: "eli mor",
        imgUrl: "https://randomuser.me/api/portraits/men/71.jpg",
      },
      {
        id: "B700",
        fullname: "Dob Moran",
        imgUrl:
          "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
      },
      {
        id: "C600",
        fullname: "Maria Pali",
        imgUrl: "https://randomuser.me/api/portraits/women/31.jpg",
      },
    ],
    followers: [
      {
        id: "B700",
        fullname: "Dob Moran",
        imgUrl:
          "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
      },
    ],
    savedStoryIds: [],
    isNewNotifications: false,
    notifications: [],
    messages: [],
  },
  {
    id: "u103",
    username: "eli1",
    password: "123456",
    fullname: "eli mor",
    bio: "I’d rather regret the things I’ve done than regret the things I haven’t done",
    imgUrl: "https://randomuser.me/api/portraits/men/71.jpg",
    following: [
      {
        id: "B700",
        fullname: "Dob Moran",
        imgUrl:
          "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
      },
      {
        id: "C600",
        fullname: "Maria Pali",
        imgUrl: "https://randomuser.me/api/portraits/women/31.jpg",
      },
    ],
    followers: [
      {
        id: "B700",
        fullname: "Dob Moran",
        imgUrl:
          "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
      },
    ],
    savedStoryIds: [],
    isNewNotifications: false,
    notifications: [
      {
        id: utilService.makeId(),
        type: "like your story",
        by: {
          id: "B700",
          fullname: "Dob Moran",
          imgUrl:
            "https://media.allure.com/photos/5c734d9adbe270553d92abf1/1:1/w_1503,h_1503,c_limit/Rami-Malek-Oscars-2019-Look-Dyp.jpg",
        },
      },
    ],
    messages: [],
  },
  {
    id: "o12344",
    username: "Daniel22",
    password: "123456",
    fullname: "Daniel Levy",
    bio: "Be strong and man!",
    imgUrl:
      "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    following: [],
    followers: [],
    savedStoryIds: [],
    isNewNotifications: false,
    notifications: [],
    messages: [],
  },
  {
    id: "b343434",
    username: "Leon30",
    password: "123456",
    fullname: "Leon Dimitrov",
    bio: "Stalin is my king!",
    imgUrl:
      "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    following: [],
    followers: [],
    savedStoryIds: [],
    isNewNotifications: false,
    notifications: [],
    messages: [],
  },
  {
    id: "c898989",
    username: "AdamBit",
    password: "123456",
    fullname: "Adam Biton",
    bio: "I support Israel!",
    imgUrl:
      "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    following: [],
    followers: [],
    savedStoryIds: [],
    isNewNotifications: false,
    notifications: [],
    messages: [],
  },
  {
    id: "d34236",
    username: "LinaLove",
    password: "123456",
    fullname: "Lina Sorokina",
    bio: "Go after your dreams!",
    imgUrl:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    following: [],
    followers: [],
    savedStoryIds: [],
    isNewNotifications: false,
    notifications: [],
    messages: [],
  },
  {
    id: "f909090",
    username: "Dikla1990",
    password: "123456",
    fullname: "Dikla Din",
    bio: "When you will see me you will understand that a woman can be very strong",
    imgUrl:
      "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
    following: [],
    followers: [],
    savedStoryIds: [],
    isNewNotifications: false,
    notifications: [],
    messages: [],
  },
]

async function query() {
  try {
    let users
    users = await httpService.get("users")
    if (!users.data.length) {
      users = gUsers
      httpService.post("users", users)
    }
    return users.data
  } catch (err) {
    console.log("Had Error", err)
  }
}

async function fetchCurrentUser(switchUser) {
  try {
    let user
    let loggedUser
    if (switchUser) {
      user = await httpService.post("currentUser", switchUser)
      utilService.saveToStorage(AUTH_KEY, switchUser)
    } else {
      loggedUser = await storageService.query(AUTH_KEY)
      if (!loggedUser) {
        loggedUser = utilService.saveToStorage(AUTH_KEY, gUsers[0])
      }
      console.log(loggedUser)
      user = await httpService.post("currentUser", loggedUser)
    }
    return user.data
  } catch (err) {
    console.log("Had Error", err)
  }
}

async function updateUsers(updatedUsers) {
  try {
    let users = await storageService.query(STORAGE_KEY)
    users = updatedUsers
    utilService.saveToStorage(STORAGE_KEY, users)
    return users
  } catch (err) {
    console.log("Had Error", err)
  }
}

async function update(user) {
  let updatedsUser = await httpService.put("user", user)

  return updatedsUser.data
}

