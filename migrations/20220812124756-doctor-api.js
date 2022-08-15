const moment = require("moment");
const doctorDb = [
  {
    name: "Kiril",
    spec: "Hirurg",
    slots: [
      {
        taken: false,
        date: moment("2022-08-17").add(12, "hours").format()
      },
      {
        taken: false,
        date: moment("2022-08-17").add(13, "hours").format()
      },
      {
        taken: false,
        date: moment("2022-08-17").add(14, "hours").format()
      },
      {
        taken: false,
        date: moment("2022-08-17").add(15, "hours").format()
      },
      {
        taken: false,
        date: moment("2022-08-17").add(16, "hours").format()
      }
    ]
  },
  {
    name: "Lisa",
    spec: "Terapevt",
    slots: [
      {
        taken: false,
        date: moment("2022-08-18").add(12, "hours").format()
      },
      {
        taken: false,
        date: moment("2022-08-18").add(13, "hours").format()
      },
      {
        taken: false,
        date: moment("2022-08-18").add(14, "hours").format()
      },
      {
        taken: false,
        date: moment("2022-08-18").add(15, "hours").format()
      },
      {
        taken: false,
        date: moment("2022-08-18").add(16, "hours").format()
      }
    ]
  },
  {
    name: "Vlad",
    spec: "Psiholog",
    slots: [
      {
        taken: false,
        date: moment("2022-08-19").add(12, "hours").format()
      },
      {
        taken: false,
        date: moment("2022-08-19").add(13, "hours").format()
      },
      {
        taken: false,
        date: moment("2022-08-19").add(14, "hours").format()
      },
      {
        taken: false,
        date: moment("2022-08-19").add(15, "hours").format()
      },
      {
        taken: false,
        date: moment("2022-08-19").add(16, "hours").format()
      }
    ]
  }
];
const userDb = [
  {
    phone: "+7 926 578 85 14",
    name: "Dima"
  },
  {
    phone: "+7 926 578 85 14",
    name: "Karina"
  },
  {
    phone: "+7 926 578 85 14",
    name: "Igor"
  },
  {
    phone: "+7 926 578 85 14",
    name: "Nina"
  },
  {
    phone: "+7 926 578 85 14",
    name: "Mark"
  },
  {
    phone: "+7 926 578 85 14",
    name: "Jessica"
  }
];

module.exports = {
  async up(db, client) {
    await db.collection("doctors").insertMany(doctorDb);
    await db.collection("users").insertMany(userDb);
  },

  async down(db, client) {
    await db.collection("doctors").drop();
    await db.collection("users").drop();
    await db.collection("cards").drop();
  }
};