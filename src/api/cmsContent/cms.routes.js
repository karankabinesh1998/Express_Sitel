const router = require("express").Router();
const cmsContent = require("./cms.controller");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const requestIp = require("request-ip");

var whitelist = [
 "localhost:3006",
 "localhost:3000",
 "http://192.168.0.124:3000/",
 
];

const corsOptionsDelegate = (req, res, next) => {
  try {
    console.log(req.headers.origin,"HEADERS");
    console.log(req.headers.referer,"ORIGINS");
    if (req.headers.origin !== undefined) {
      const splitReferer = req.headers.referer.split("/");
      const splitOrgin = req.headers.origin.split("/");
      const reqOrgin = splitOrgin[2];
      const reqReferer = splitReferer[2];
      console.log(splitReferer[2] + "->" + splitOrgin[2]);
      console.log( whitelist.indexOf(reqOrgin),whitelist.indexOf(reqReferer))
      if (
        whitelist.indexOf(reqOrgin) !== -1 &&
        whitelist.indexOf(reqReferer) !== -1
      ) {
        
        next();
      }
    } else {
      return res.status(400).json("Unauthorized Routes");
    }
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: "Invalid Request"
    });
  }
};


router
  .route("/master/:tableName/:id?/:order?")
//   .post(corsOptionsDelegate, cmsContent.addMaster)
//  //.get(corsOptionsDelegate, cmsContent.getMasterValues)
  .put(corsOptionsDelegate, cmsContent.updateMaster)
//   .delete(corsOptionsDelegate, cmsContent.deleteMaster);

// // router.post("/login",corsOptionsDelegate,cmsContent.Test)  

// router
//   .route("/getFullFreedom/getFreedom")
//   .put(corsOptionsDelegate,cmsContent.getFreedom)  locationvandl

router
.route("/addpost")
.post(corsOptionsDelegate,cmsContent.AddPost);

router
.route("/locationvandl")
.get(corsOptionsDelegate,cmsContent.GetLocationVandL);

router
.route("/rulevandl")
.get(corsOptionsDelegate,cmsContent.GetRuleVandL);

router
.route("/location/:id?")
.post(corsOptionsDelegate,cmsContent.AddLocation)
.get(corsOptionsDelegate,cmsContent.GetLocation)
.put(corsOptionsDelegate,cmsContent.UpdateLocation)

router
.route("/rules/:id?")
.post(corsOptionsDelegate,cmsContent.AddRules)
.get(corsOptionsDelegate,cmsContent.GetRules)
.put(corsOptionsDelegate,cmsContent.UpdateRule)


router
.route("/deletepost/:id")
.delete(corsOptionsDelegate,cmsContent.deleteMaster);

router
.route("/updatepost/:id")
.post(corsOptionsDelegate,cmsContent.UpdatePostDataById);

router
.route("/login")
.post(corsOptionsDelegate,cmsContent.LoginUserData);


router
.route("/adddetails/:id?")
.post(corsOptionsDelegate,cmsContent.AddDetails)
.get(corsOptionsDelegate,cmsContent.GetDetails)
.delete(corsOptionsDelegate,cmsContent.deleteDeatils)

router
.route("/searchdata")
.post(corsOptionsDelegate,cmsContent.SearchList);

router
.route("/searchselectdata")
.post(corsOptionsDelegate,cmsContent.SelectedSearchList);



router
.route("/getposts")
.get(corsOptionsDelegate,cmsContent.GetPostDatas);

router
.route("/getpostbyid/:id")
.get(corsOptionsDelegate,cmsContent.GetPostDataById);


module.exports = router;
