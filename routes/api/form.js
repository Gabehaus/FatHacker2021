const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// @route GET api/items
//@desc Get ALL Items
// @access Public
router.get("/", (req, res) => {});

// @route POST api/items
//@desc Create An Item
// @access Private

router.post("/", (req, res) => {
  let data = req.body;

  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "FatHacker3030@gmail.com",
      pass: "45654513aB$"
    }
  });

  let mailOptions = {
    from: data.email,
    to: "FatHacker3030@gmail.com",
    subject: `Message from ${data.email}`,
    html: `
        
        <h3>Information</h3>
        <ul>
        
          <li>Email: ${data.email}</li>
        
        </ul> 
        
        
        `
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Success");
    }

    smtpTransport.close();
  });
});

// @route DELETC api/items/:id
//@desc DELETE An Item
// @access Private

module.exports = router;
