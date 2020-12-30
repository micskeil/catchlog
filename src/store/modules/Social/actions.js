import { db } from "../../../firebase";

export default {
  getUserLikes(contex) {
    if (contex.rootGetters.user !== null) {
      const uid = contex.rootGetters.user.uid;

      db.collection("users")
        .doc(uid)
        .get()
        .then(function(doc) {
          if (doc.data().likes) {
            contex.commit("setUserLikes", {
              userLikes: doc.data().likes,
            });
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
  },

  updateUserLikes(contex, payload) {
    const uid = contex.rootGetters.user.uid;
    console.log(payload);

    contex.commit("setUserLikes", {
      userLikes: payload,
    });

    db.collection("users")
      .doc(uid)
      .set(
        {
          likes: payload,
        },
        { merge: true }
      )
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  },
};
