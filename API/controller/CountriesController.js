const Countries = require('../model/Countries');
const { Op } = require('sequelize');
const axios = require('axios');
const Pagination = require('../util/Pagination');


exports.CreateDb = ()=> {

axios.get('https://restcountries.eu/rest/v2/all')
.then(
    data =>{
      data.data.map( ( item ) => {
          let nome='',
              topLevelDomain='',
              capitale='',
              regione='',
              subregione='',
              popolazione=0,
              confini=[],
              Nome_nativo='',
              currencies_Code=[],
              langs=[],
              bandiera='';

              ( { 
                 name:nome, 
                 topLevelDomain:topLevelDomain,
                 capital:capitale,
                 region:regione,
                 subregion:subregione,
                 population:popolazione,
                 nativeName:Nome_nativo, 
                 flag:bandiera } = item);

                 item.languages.map( (name) =>{
                     return langs.push( name.name )
                 } )

                 item.currencies.map( (curr) => {
                    return currencies_Code.push( curr.name )
                 } );

                 [...confini] = item.borders

          Countries.create({
              name:nome,
              capital:capitale,
              region:regione,
              native_name:Nome_nativo,
              population:popolazione,
              sub_region:subregione,
              top_level_domain:topLevelDomain.join(","),
              currencies:currencies_Code.join(","),
              languages:langs.join(","),
              borders:confini.join(","),
              flag:bandiera
          });
      } )

    

    }
)
.catch(
    (error) => {
        console.log(error);
    }
)

    
}

exports.GetAll = async (req,res) => {
    
    const {pageNumber, pageSize } = req.query;
    
    const { limit, offset } = Pagination( +pageNumber, +pageSize );
    
    let All = await Countries.findAndCountAll( { offset:offset, limit:limit } );
    res.setHeader('Content-Type','application/json' );
    res.json(All);
}

exports.Search = async (req, res) => {
    //console.log(req.params.name);

    if( req.params.name == ' ' ) {
        GetAll();
    }
   const {pageNumber, pageSize } = req.query;
   const { limit, offset } = Pagination( +pageNumber, +pageSize );
   let search = await Countries.findAndCountAll({
       where:{
           name:{
               [Op.like]:`%${ req.params.name }%`
           }
       },
       offset:offset,
       limit:limit
   })
   res.setHeader('Content-Type','application/json' );
   res.json(search)
   
}

exports.RegionFilter = async (req, res) => {
    const {pageNumber, pageSize } = req.query;
    const { limit, offset } = Pagination( +pageNumber, +pageSize );
    let search = await Countries.findAndCountAll({
        where:{
            region:req.params.region
        },
        offset:offset,
        limit:limit
    })
    res.setHeader('Content-Type','application/json' );
    res.json(search)
}

exports.SearchRegionFilter = async (req, res) => {
    const {pageNumber, pageSize } = req.query;
    const { limit, offset } = Pagination( +pageNumber, +pageSize );
    let search = await Countries.findAndCountAll({
        where:{
            region:req.params.region,
            name:{
                [Op.like]:`%${ req.params.name }%`
            }
        },
        offset:offset,
        limit:limit
    })
    console.log(!!search);
    res.setHeader('Content-Type','application/json' );
    res.json(search)
}