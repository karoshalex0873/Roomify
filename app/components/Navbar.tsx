import { Box } from "lucide-react"
import { Button } from "./UI/Button";
import { useOutletContext } from "react-router";
const Navbar = () => {

  const { isSignedIn, userName, signIn, signOut } = useOutletContext<AuthContext>();

  // login logic function
  const handleAuthClick = async () => {
    if (isSignedIn) {
      try {
        await signOut()
      } catch (error) {
        console.error("puter sign out error:", error);
      }
      return;
    }
    try {
      await signIn();
    } catch (error) {
      console.error("puter sign in error:", error);
    }
  }

  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <div className="brand">
            <Box className="logo" />
            <span className="name">Roomify</span>
          </div>

          <ul className="links">
            <a href="#">Product</a>
            <a href="#">Pricing</a>
            <a href="#">Comnnunity</a>
            <a href="#">Enterprise</a>
          </ul>
        </div>
        <div className="actions">
          {isSignedIn ? (
            <>
              <span className="greeting">
                {userName ? `Hi , ${userName}!` : "Hi there!"}
              </span>


              <Button
                size="sm"
                onClick={handleAuthClick}
                className="btn"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleAuthClick}
                size="sm"
                variant="ghost"
              >
                Log In
              </Button>

              <a href="#upload" className="cta">
                Get Started
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
