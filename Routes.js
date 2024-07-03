import axios from 'axios';
import Express from 'express';
import Transactions from './Models/Transactions.js';
const router=Express.Router();
//geting transaction
router.post("/transactions",async(req,res)=>{
    try {
        const data=await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        data.data.map(async(e)=>{
            const id=e.id;
            const title=e.title;
            const price=e.price;
            const description=e.description;
            const category=e.category;
            const image=e.image;
            const sold=e.sold;
            const dateOfSale=e.dateOfSale;
            const date =new Date(dateOfSale);
            const month = months[date.getMonth()];
            
            const data2=await new Transactions({
                id,title,price,description,category,category,image,sold,dateOfSale,month
            }).save();
        })
        res.status(200).send({
            success:true, 
        message:"data got succesfully",
        Data:data.data,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in geting news",
            error
        })
    }

})

//search api

router.post('/search/:page',async(req,res)=>{
    try {
        const {search,month}=req.body;
        const perPage = 10;
        const page = req.params.page ? req.params.page : 1;
        if(search===""){
            const result=await Transactions.find({
                $and:[{ month: { $regex: month, $options: "i" } },]
            }).skip((page-1)*perPage).limit(perPage);
            return res.json(result)
        }else{
        const result=await Transactions.find({
        $or:[
                { title: { $regex: search, $options: "i" } },
                { price: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ]
            
        }).skip((page-1)*perPage).limit(perPage);

        res.json(result);
    }
    } catch (error) {
        
      res.status(400).send({
        success: false,
        message: "error in serch transactions API",
        error,
      });
    }
})

//statics api

router.get('/monthselected/:month',async(req,res)=>{
    try {
        const month=req.params.month;
    
        let saleamount=0;
        let solditems=0;
        let notsolditems=0;
        const data=await Transactions.find();
        data.filter((e)=>{
            if(e.month===month){
                saleamount+=Number(e.price);
                solditems++;
            }else{
                notsolditems++;
            }
            return
        })
       const montselect={
            saleamount:saleamount,
            solditems:solditems,
            notsolditems:notsolditems
        }
        res.status(200).send({
        Data:montselect,
        })
    } catch (error) {
        
      res.status(400).send({
        success: false,
        message: "error in serch transactions API",
        error,
      });
    }
})

//price range
router.get('/barchart/:month',async(req,res)=>{
    try {
        const month=req.params.month;
     
        const barchart=[0,0,0,0,0,0,0,0,0,0]

        const data=await Transactions.find();
        data.filter((e)=>{
            if(e.month===month){
                if(Number(e.price)<100){
                    let c=barchart[0];
                    barchart[0]=c+1;
                }else if(Number(e.price)<200){
                    let c=barchart[1];
                    barchart[1]=c+1;
                }else if(Number(e.price)<300){
                    let c=barchart[2];
                    barchart[2]=c+1;
                }else if(Number(e.price)<400){
                    let c=barchart[3];
                    barchart[3]=c+1;
                }else if(Number(e.price)<500){
                    let c=barchart[4];
                    barchart[4]=c+1;
                }else if(Number(e.price)<600){
                    let c=barchart[5];
                    barchart[5]=c+1;
                }else if(Number(e.price)<700){
                    let c=barchart[6];
                    barchart[6]=c+1;
                }else if(Number(e.price)<800){
                    let c=barchart[7];
                    barchart[7]=c+1;
                }else if(Number(e.price)<900){
                    let c=barchart[8];
                    barchart[8]=c+1;
                }else if(Number(e.price)>900){
                    let c=barchart[9];
                    barchart[9]=c+1;
                }
            } 
        })
     
        res.status(200).send({
        Data:barchart,
        })
    } catch (error) {
        
      res.status(400).send({
        success: false,
        message: "error in serch transactions API",
        error,
      });
    }
})


//category api
router.get('/category/:month',async(req,res)=>{
    try {
        const month=req.params.month;
        const categorys={
            "men's clothing":0,
            "jewelery":0,
            "electronics":0,
            "women's clothing":0,
        }
        const data=await Transactions.find();
        data.filter((e)=>{

            if(e.month===month){
            if(e.category==="men's clothing"){
                categorys["men's clothing"]=categorys["men's clothing"]+1;
            }else if(e.category==="jewelery"){
                categorys["jewelery"]=categorys["jewelery"]+1;
            }else if(e.category==="electronics"){
                categorys["electronics"]=categorys["electronics"]+1;
            }else if(e.category==="women's clothing"){
                categorys["women's clothing"]=categorys["women's clothing"]+1;
            }
        }
        })
        res.status(200).send({
        Data:categorys,
        })


    } catch (error) {
        
      res.status(400).send({
        success: false,
        message: "error in serch transactions API",
        error,
      });
    }
})

//API for pie chart Find
router.get('/piechart/:month',async(req,res)=>{
    try {
        const month=req.params.month;
        console.log(month)
        const Monthselected =await axios.get(`http://localhost:8080/api/v2/auth/monthselected/${month}`);
        const Category =await axios.get(`http://localhost:8080/api/v2/auth/category/${month}`);
        const Barchart =await axios.get(`http://localhost:8080/api/v2/auth/barchart/${month}`);



        const data={
            Monthselected:Monthselected.data.Data,
            Category:Category.data.Data,
            Barchart:Barchart.data.Data
        }
        res.status(200).send({
            success:true, 
        message:"category got succesfully",
       data:data
        })


    } catch (error) {
       
      res.status(400).send({
        success: false,
        message: "error in serch transactions API",
        error,
      });
    }
})


export default router