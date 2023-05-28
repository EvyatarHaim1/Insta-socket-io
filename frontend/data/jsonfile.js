const story = {
  "id": "s101",
  "txt": "Best trip ever",
  "imgUrl": "http://some-img", //Can be an array if decide to support multiple imgs
  "by": {
    "id": "u101",
    "fullname": "Ulash Ulashi",
    "imgUrl": "http://some-img"
  },
  "loc": {
    "lat": 11.11,
    "lng": 22.22,
    "name": "Tel Aviv"
  },
  "comments": [
    {
      "id": "c1001",
      "by": {
        "id": "u105",
        "fullname": "Bob",
        "imgUrl": "http://some-img"
      },
      "txt": "good one!",
      "likedBy": [ // Optional
        {
          "id": "u105",
          "fullname": "Bob",
          "imgUrl": "http://some-img"
        }
      ]
    },
    {
      "id": "c1002",
      "by": {
        "id": "u106",
        "fullname": "Dob",
        "imgUrl": "http://some-img"
      },
      "txt": "not good!",
    }
  ],
  "likedBy": [
    {
      "id": "u105",
      "fullname": "Bob",
      "imgUrl": "http://some-img"
    },
    {
      "id": "u106",
      "fullname": "Dob",
      "imgUrl": "http://some-img"
    }
  ],
  "tags": ["fun", "kids"]
}


const user = {
  "id": "u101",
  "username": "Muko",
  "password": "mukmuk",
  "fullname": "Muki Muka",
  "imgUrl": "http://some-img",
  "following": [
    {
      "id": "u106",
      "fullname": "Dob",
      "imgUrl": "http://some-img"
    }
  ],
  "followers": [
    {
      "id": "u105",
      "fullname": "Bob",
      "imgUrl": "http://some-img"
    }
  ],
  "savedStoryIds": ["s104", "s111", "s123"]
}