import Nav from './Nav';
export default function HomePage(){

  return (
    <>
      <Nav />
      <div className="container">
        <h2>Unified Declarative Backend Management</h2>
        <p>
         	A single source of truth for API, database, and query management.
        </p>
	 <p>
    Nectarine is a YAML-based backend library. You can craft data schemas, APIs, and interact with databases--all from
    a single source. This allows for modular SQL queries that are not hard-coded.
	 </p>
      </div>
    </>
  );
}
