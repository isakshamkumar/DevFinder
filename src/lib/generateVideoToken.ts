
export async function generateTokenAction(id:string) {
    // const session = await getSession();
  
    if (!id) {
      throw new Error("No session found");
    }
  
 
    // return token;
    const response= await fetch('/api/generateToken',{method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:id
        })
  
    })
    const data= await response.json()
    console.log(data,'dataaaaa');
    return data.token
    
  }