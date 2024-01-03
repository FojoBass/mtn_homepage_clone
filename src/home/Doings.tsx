import { useHomeContext } from '../contexts/homeContext';
import { doingOpts } from '../data';

const Doings = () => {
  const { intersectRef } = useHomeContext();

  return (
    <section className='doing_sect'>
      <div className='center_sect'>
        <h1>Get doing with MTN</h1>

        <div className='doings_opts'>
          {doingOpts.map((opt) => (
            <div
              className='doings_opt int_obs'
              ref={(el) => el && intersectRef?.current?.push(el)}
              key={opt.title}
            >
              <div className='heading'>
                <span className='icon'>
                  <opt.icon />
                </span>
                <h3 className='title'>{opt.title}</h3>
              </div>

              <p className='text'>{opt.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doings;
