import { NavLink } from 'react-router-dom';
import Contatti from './Contatti';
import { useTheme } from '../../ThemeContext';
import { useEffect } from 'react';


function Home() {
  const { currentUser, setNavActive } = useTheme();

  useEffect(() => {
    setNavActive([true, false, false, false]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='Home'>
      <Contatti />
      <NavLink to='/book'>
        {currentUser.userName !== 'anonymousUser' && (
          <>
            <h2>Welcome {currentUser.userName}</h2>
          </>
        )}
        <div className='book'>
          <div className='front'>
            <div className='cover'>
              <section>
                <p style={{ fontSize: '1.5vw' }} className='author'>
                  Duilia Dias
                </p>
                <br />
                <br />
                <br />
                <p
                  style={{ fontWeight: 'bolder', fontSize: '2.5vw' }}
                  className='author'
                >
                  Al Porto
                </p>
                <br />
                <p
                  style={{ fontFamily: 'italic', fontSize: '1.5vw' }}
                  className='author'
                >
                  Poesie
                </p>

                <p
                  style={{ fontFamily: 'italic', fontSize: '1.5vw' }}
                  className='author'
                >
                  di acque, di terre, di amori
                </p>
              </section>
            </div>
          </div>
          <div className='left-side'>
            <h2>
              <span>Duilia Dias</span>
              <span>Al Porto</span>
              <span>2021</span>
            </h2>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default Home;
