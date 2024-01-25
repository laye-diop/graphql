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
    xp : transaction_aggregate(where :{_and :[{   type : {_eq : "xp"}} , {path : {_iregex : "/.*dakar/div-01.*/"}} ,{path : {_nregex : "/.*piscine-js.+/"}} ] })
    {
      aggregate {
        sum {
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
    audit (where :{ _and :[ { auditorId : {_eq : ${IdUser}}} , {grade : {_is_null : false}} ]}, limit : 5) {
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
	audit (where :{ _and :[ { auditorId : {_eq : 8655}} , {grade : {_is_null : false}} ]}) {
    grade
    group {
      captainLogin
    	object {
        name
      }
    }
    
  }
}

`