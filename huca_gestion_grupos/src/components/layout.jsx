import PropTypes from 'prop-types'

const Layout = (props) => {
  return (
    <section className="w-5/6 mx-auto px-8 pt-10">
      {props.children}
    </section>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout