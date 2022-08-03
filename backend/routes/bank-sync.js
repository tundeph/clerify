const { R } = require("styled-icons/crypto")

const router = require("express").Router()

router.route("/sync-mono").post((req, res) => {
  console
    .log(req.body)
    .then(res.status(200).end)
    .catch((err) => res.status(400).json("Ther's eror somewhere" + err))
})

module.exports = router
