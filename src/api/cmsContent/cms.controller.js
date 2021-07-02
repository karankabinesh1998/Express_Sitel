const CmsContent = require("./cms.model");
const { endConnection } = require("../../helpers/databaseConnection");
const chalk = require("chalk");
var nss = require('node-suggestive-search').init();





const addMaster = async (req, res, next) => {
  const tableName = req.params.tableName;
  const body = req.body;
  console.log(body)
  try {
    const result = await CmsContent.addMaster(tableName, body);
    if(result){
      res.send(result);
    }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

const AddDetails = async (req, res, next) => {
  // const tableName = req.params.tableName;
  const body = req.body;
  console.log(body)
  try {
    const result = await CmsContent.addMaster(`tbl_details`,body);
    if(result){
      res.send(result);
    }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};



const SearchList = async (req, res, next) => {

  let body = req.body;
  console.log(body);

  try {
    const result = await CmsContent.getFreedom(
      `tbl_details.*,tbl_location.location as locationname,tbl_rule.rule as rulename, tbl_user_web.username as createdBy`,
      `tbl_details,tbl_location,tbl_rule,tbl_user_web`,
      `tbl_details.location = tbl_location.id and tbl_rule.id = tbl_details.rule and tbl_details.createdBy = tbl_user_web.id` ,
      1,
      "tbl_details.id DESC"
      );

      const UserData = await CmsContent.getFreedom(`*`,`tbl_user_web`,1,1,1);
 
      let wait = await result.map((ival,i)=>{
        UserData.map((jval,j)=>{
            if(ival.modifiedby == jval.id){
               
              ival.ModifiedUser = jval.username
            }
        })
      })

      await Promise.all(wait)

      let final_value =[]

    if(result){
      // res.send(result);
      
      let NewJSON = JSON.stringify(result)

      // console.log(result);

      nss.loadJsonString(NewJSON, "description","locationname","rulename","ModifiedUser","createdBy").then(data => {
        // response: { words: 5, items: 2, timeElapsed: '2ms' }
    console.log(data);
    nss.query(`'${body.search}'`, true).then(async(data1) => {

      console.log(data1);

      if(Object.keys(data1).length !== 0){
        // res.send(data1.items)

        let wait2 = await result.map((ival,i)=>{
          data1.items.map((jval,j)=>{
             if(ival.id == jval.id){
              final_value.push(ival)
             }
          })
        })

        await Promise.all(wait2)

        res.send(final_value)

      }

     })
        // response: { words: 5, items: 2, timeElapsed: '1ms' }
    });

    
    }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

const SelectedSearchList = async (req, res, next) => {

  let body = req.body;
  console.log(body);

  let option = null;

  if(body.option=='location'){
    option = "locationname"
  }else if(body.option=='rule'){
    option ="rulename"
  }else if(body.option=='modifiedBy'){
    option = "ModifiedUser"
  }

  try {
    const result = await CmsContent.getFreedom(
      `tbl_details.*,tbl_location.location as locationname,tbl_rule.rule as rulename, tbl_user_web.username as createdBy`,
      `tbl_details,tbl_location,tbl_rule,tbl_user_web`,
      `tbl_details.location = tbl_location.id and tbl_rule.id = tbl_details.rule and tbl_details.createdBy = tbl_user_web.id` ,
      1,
      "tbl_details.id DESC"
      );

      const UserData = await CmsContent.getFreedom(`*`,`tbl_user_web`,1,1,1);
 
      let wait = await result.map((ival,i)=>{
        UserData.map((jval,j)=>{
            if(ival.modifiedby == jval.id){
               
              ival.ModifiedUser = jval.username
            }
        })
      })

      await Promise.all(wait)

      let final_value =[]

    if(result){
      // res.send(result);
      
      let NewJSON = JSON.stringify(result)

      // console.log(result);

      nss.loadJsonString(NewJSON, "description",`${option}`).then(data => {
        // response: { words: 5, items: 2, timeElapsed: '2ms' }
    console.log(data);
    nss.query(`'${body.search}'`, true).then(async(data1) => {

      console.log(data1);

      if(Object.keys(data1).length !== 0){
        // res.send(data1.items)

        let wait2 = await result.map((ival,i)=>{
          data1.items.map((jval,j)=>{
             if(ival.id == jval.id){
              final_value.push(ival)
             }
          })
        })

        await Promise.all(wait2)

        res.send(final_value)

      }

     })
        // response: { words: 5, items: 2, timeElapsed: '1ms' }
    });

    
    }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

// SearchList()


const GetLocation = async (req, res, next) => {
  try {
    const result = await CmsContent.getFreedom(`*`,`tbl_location`,1,1,1);
    if(result){
      res.send(result);
    }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};


const GetTranscript = async (req, res, next) => {
  try {
    const result = await CmsContent.getFreedom(`*`,`tbl_audio_or_video`,1,1,1);
    if(result){
      res.send(result);
    }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

const GetDetails = async (req, res, next) => {
  try {
    // let Final_data = []
    const result = await CmsContent.getFreedom(
      `tbl_details.*,tbl_location.location as locationname,tbl_rule.rule as rulename, tbl_user_web.username as createdBy`,
      `tbl_details,tbl_location,tbl_rule,tbl_user_web`,
      `tbl_details.location = tbl_location.id and tbl_rule.id = tbl_details.rule and tbl_details.createdBy = tbl_user_web.id` ,
      1,
      "tbl_details.id DESC"
      );

      const UserData = await CmsContent.getFreedom(`*`,`tbl_user_web`,1,1,1);
 
      let wait = await result.map((ival,i)=>{
        UserData.map((jval,j)=>{
            if(ival.modifiedby == jval.id){
               
              ival.ModifiedUser = jval.username
            }
        })
      })

      await Promise.all(wait)



    if(result){
      res.send(result);
    }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};


const GetRules = async (req, res, next) => {
  try {
    const result = await CmsContent.getFreedom(`*`,`tbl_rule`,1,1,1);
    if(result){
      res.send(result);
    }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};


const GetLocationVandL = async (req, res, next) => {
  try {
    const result = await CmsContent.getFreedom(`id as value, location as label`,`tbl_location`,1,1,1);
    if(result){
      res.send(result);
    }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};


const GetRuleVandL = async (req, res, next) => {
  try {
    const result = await CmsContent.getFreedom(`id as value, rule as label`,`tbl_rule`,1,1,1);
    if(result){
      res.send(result);
    }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

const AddRules = async (req, res, next) => {
  // const tableName = req.params.tableName;
  const body = req.body;
  console.log(body)
  try {

    const Location = await CmsContent.getFreedom(
      `*`,
      `tbl_rule`,
      `rule = '${body.rule}'`,
      1,
      1
    )

    if(Location.length==0){

    const result = await CmsContent.addMaster(`tbl_rule`, body);
    if(result){
      res.send(result);
    }

  }else{
    
    res.send(false)

  }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

const AddLocation = async (req, res, next) => {
  // const tableName = req.params.tableName;
  const body = req.body;
  console.log(body)
  try {

    const Location = await CmsContent.getFreedom(
      `*`,
      `tbl_location`,
      `location = '${body.location}'`,
      1,
      1
    )

    if(Location.length==0){

    const result = await CmsContent.addMaster(`tbl_location`, body);
    if(result){
      res.send(result);
    }

  }else{
    
    res.send(false)

  }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};



const AddPost = async (req,res,next)=>{
  console.log(req.body);
  // res.send(req.body)

  try{

    const result = await CmsContent.addMaster(`tbl_posts`,req.body);

    if(result){
        res.statusCode = 302;
        res.setHeader('Location', 'http://localhost:3000/posts');
        res.end();
    }
    endConnection();


    

  }catch(error){
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }

  
}


const GetPostDataById = async(req,res,next)=>{

  try {
    const result = await CmsContent.getFreedom(
      `*`,
      `tbl_posts`,
      `id=${req.params.id}`,
      1,
      1
    );
    if(result){
      console.log(result);
      res.send(result);
    }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }

}

const LoginUserData = async(req,res,next)=>{
    let body = req.body;
  try {
    const result = await CmsContent.getFreedom(
      `*`,
      `tbl_user_web`,
      `email_id = '${body.email_id}' and password = '${body.password}' `,
      1,
      "id"
    );
    if(result){
      console.log(result);
      res.send(result);
    }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }

}

const GetPostDatas = async(req,res,next)=>{

  try {
    const result = await CmsContent.getFreedom(
      `*`,
      `tbl_posts`,
      1,
      1,
      "id DESC"
    );
    if(result){
      console.log(result);
      res.send(result);
    }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }

}


const UpdateRule = async(req,res,next)=>{
  let id  = req.params.id;
try {
  const Location = await CmsContent.getFreedom(
    `*`,
    `tbl_rule`,
    `rule = '${body.rule}'`,
    1,
    1
  )

  if(Location.length==0){
 const result = await CmsContent.updateMaster(
   `tbl_rule`,
   id,
   req.body
 );
 if(result){
   res.send(result);
   
 }
}else{
  res.send(false)
}
 endConnection();
 
} catch (error) {
 //db end connection
 endConnection();
 console.error(chalk.red(error));
 res.status(500);
 next(error);
}

}

const UpdateLocation = async(req,res,next)=>{
  let id  = req.params.id;
try {

  const Location = await CmsContent.getFreedom(
    `*`,
    `tbl_location`,
    `location = '${body.location}'`,
    1,
    1
  )

  if(Location.length==0){
 const result = await CmsContent.updateMaster(
   `tbl_location`,
   id,
   req.body
 );
 if(result){
   res.send(result);
   
 }
}else{
  res.send(false)
}
 endConnection();
 
} catch (error) {
 //db end connection
 endConnection();
 console.error(chalk.red(error));
 res.status(500);
 next(error);
}

}

const UpdatePostDataById = async(req,res,next)=>{
     let id  = req.params.id;
  try {
    const result = await CmsContent.updateMaster(
      `tbl_posts`,
      id,
      req.body
    );
    if(result){
      res.statusCode = 302;
      res.setHeader('Location', 'http://localhost:3000/posts');
      res.end();
    }
    endConnection();
    
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }

}


const updateMaster = async (req, res, next) => {
  const tableName = req.params.tableName;
  const body = req.body.categoryArray;
  const id = req.body.id;
  let columname = req.params.id;

  try {
    const result = await CmsContent.updateMaster(
      tableName,
      id,
      body,
      columname
    );
    if (result) {
       res.status(200);
        res.send(result);
    }
    // db end connection
    endConnection();
    // res.send(result);
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};


const deleteDeatils = async (req, res, next) => {
 
  try{
  const id = req.params.id;
  const result = await CmsContent.deleteMasterfromTable(
    `tbl_details`,
    `id=${id}`
  );
  if (result) {
    // const RD = await DeleteToRedis(tableName, id, 159);
    res.send(result);
   }
  endConnection();
  // res.send(result);
} catch (error) {
  //db end connection
  endConnection();
  console.error(chalk.red(error));
  res.status(500);
  next(error);
}
};


const deleteMaster = async (req, res, next) => {
  // const tableName = req.params.tableName;

  const id = req.params.id;
  try {
    const result = await CmsContent.deleteMasterfromTable(
      `tbl_location`,
      `id=${id}`
    );
    //console.log(result);
    if (result) {
     // const RD = await DeleteToRedis(tableName, id, 159);
     res.send(result);
    }
    //db end connection
    endConnection();
   
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

const DownloadImage = async(req,res,next)=>{
  let body = req.params.filename;

  try{


 let  uploadPath = __dirname + '/Video/'+`${body}`;


console.log(uploadPath)
res.sendFile(uploadPath)

}catch(error){
  console.error(chalk.red(error));
  res.status(500);
  next(error);
}

}


module.exports = {
  deleteMaster,
  addMaster,
  updateMaster,
  GetPostDatas,
  AddPost,
  GetPostDataById,
  UpdatePostDataById,
  AddLocation,
  GetLocation,
  UpdateLocation,
  GetLocationVandL,
 GetRules ,
 AddRules,
 UpdateRule,
 GetRuleVandL,
 LoginUserData,
 AddDetails,
 GetDetails,
 deleteDeatils,
 SearchList,
 SelectedSearchList,
 DownloadImage,
 GetTranscript

  
};
