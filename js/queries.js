export function Mainquery(IdUser) {
  
  return `
  {
    user {
      id 
      firstName
      lastName
      login
      email
    }
    xp : transaction_aggregate(
      where: {type: {_eq: "xp"}, event: {object: {type: {_eq: "module"}}}}
    ) {
      aggregate{
        sum{
          amount
        }
      }
    }  
  	level :  transaction_aggregate(where :{_and :[{   type : {_eq : "level"}} , {path : {_iregex : "/.*dakar/div-01.*/"}} ,{path : {_nregex : "/.*piscine-js.+/"}} ] })
    {
      aggregate {
        max {
          amount
        }
      }
    }
    audit (where :{ _and :[ { auditorId : {_eq : ${IdUser}}} , {grade : {_is_null : false}} ]}, limit : 12) {
      grade
      group {
        captainLogin
        object {
          name
        }
      }
      
    }
    transaction(where : { type : {_iregex : "skill"}} ,distinct_on : type ) {
      transaction_type {
        type
        transactions_aggregate {
          aggregate {
            max {
              amount
            }
          }
        }
      }
    }
    projectXp : transaction(where :{_and :[{   type : {_eq : "xp"}} , {path : {_iregex : "/.*dakar/div-01.*/"}} ,{path : {_nregex : "/.*piscine-js.+/"} }  ] } order_by : {createdAt : asc} )
    {
      amount
      createdAt
    }
    Attempts : transaction(where :{_and :[{   type : {_eq : "xp"}} , {path : {_iregex : "/.*piscine.*/"}} ,{path : {_nregex : "/.*piscine-js.+/"}} ] } , limit : 15 )
     {
       object {
        name
         progresses_aggregate {
        	aggregate {
            count(columns : grade) 
          }
         }
       }
     }
  }
  `

} 

let xps = `

{
  transaction_aggregate(where :{_and :[{   type : {_eq : "xp"}} , {path : {_iregex : "/.*dakar/div-01.*/"}} ,{path : {_nregex : "/.*piscine-js.+/"}} ] })
{
    aggregate {
      sum {
        amount
      }
    }
  }
}
`
let skills = `
{
  transaction(where : { type : {_iregex : "skill"}} ,distinct_on : type ) {
      transaction_type {
        type
        transactions_aggregate {
          aggregate {
            max {
              amount
            }
          }
        }
      }
  }
}
`
let audit = `
{
  projectXp : transaction(where :{_and :[{   type : {_eq : "xp"}} , {path : {_iregex : "/.*dakar/div-01.*/"}} ,{path : {_nregex : "/.*piscine-js.+/"} }  ] } order_by : {createdAt : asc} )
     {
       object {
         name
       }
       amount
       createdAt
     }
  
  }
`