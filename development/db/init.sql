DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'hackathon') THEN
      CREATE USER "hackathon" WITH CREATEDB PASSWORD 'hackathon';
END IF;
END
$$;

DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'hackathon') THEN
      CREATE DATABASE "hackathon" OWNER "hackathon";
END IF;
END
$$;