export const verifyAuthentication = () => {
    if(JSON.parse(sessionStorage.getItem('current_user'))){
        let path = window.location.pathname
        console.log(path)
        if(["/", "", "/entrar"].indexOf(path) !== -1){
            this.$router.push('/home')
        }else{
            this.$router.push(path)
        }
    }else{
        this.$router.push('/entrar')
    }
}