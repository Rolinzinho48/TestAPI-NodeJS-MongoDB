const express = require('express')
const mongoose = require('mongoose')


const User = require('./models/User')

const app = express()
const port = 3000


//para poder acessar o body como json
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())


//rotas da api
app.get('/users', async (req, res) => {
    try {
      const user = await User.find()
  
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
})
app.get('/users/:id', async (req, res) => {
    const idUser = req.params.id

    try{
        const user = await User.findOne({_id:idUser})
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({erro:error})
    }
})


app.post('/users', async(req,res)=>{
    
    const {nome,saldo,PosX} = req.body
    const user = {
        nome,
        saldo,
        PosX
    }

    if(!nome){
        res.status(422).json({mensage:"O nome é obrigatorio!"})
    }
    else if(saldo == undefined){
        res.status(422).json({mensage:"O saldo é obrigatorio!"})
    }
    else if(PosX == undefined){
        res.status(422).json({mensage:"A posicao é obrigatoria!"})
    }
    else{
        try{
            //criando dados
            await User.create(user)
    
            res.status(201).json({message:"Usuario cadastrado com sucesso!"})
        }catch(error){
            res.status(400).json({erro:error})
        }
    }
   
    
})

app.patch('/users/:id', async (req, res) => {
    const idUser = req.params.id
  
    const { nome, saldo, PosX } = req.body
  
    const person = {
      nome,
      saldo,
      PosX,
    }
  
    try {
      const UserAtualizado = await User.updateOne({ _id: idUser }, person)
  
      if (UserAtualizado.matchedCount === 0) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
      else{
          res.status(200).json(person)
      }
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

//inicializar o servido quando conectar ao mongo
mongoose.connect('mongodb://localhost:27017/test')
.then(()=>{
    app.listen(port,()=>{
        console.log("Rodando")
    })}
).catch(error => console.log(error))
