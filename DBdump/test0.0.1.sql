--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.0

-- Started on 2020-03-09 11:48:49

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2829 (class 1262 OID 32769)
-- Name: test; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE test WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';


ALTER DATABASE test OWNER TO postgres;

\connect test

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 32781)
-- Name: test; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA test;


ALTER SCHEMA test OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 32782)
-- Name: employee_id_seq; Type: SEQUENCE; Schema: test; Owner: postgres
--

CREATE SEQUENCE test.employee_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE test.employee_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 206 (class 1259 OID 32790)
-- Name: t_employee; Type: TABLE; Schema: test; Owner: postgres
--

CREATE TABLE test.t_employee (
    id integer DEFAULT nextval('test.employee_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    age integer NOT NULL,
    phone integer
);


ALTER TABLE test.t_employee OWNER TO postgres;

--
-- TOC entry 2823 (class 0 OID 32790)
-- Dependencies: 206
-- Data for Name: t_employee; Type: TABLE DATA; Schema: test; Owner: postgres
--

INSERT INTO test.t_employee VALUES (1, 'Сергей', 1900, 846251);
INSERT INTO test.t_employee VALUES (2, 'Артем', 1972, 511495);


--
-- TOC entry 2830 (class 0 OID 0)
-- Dependencies: 205
-- Name: employee_id_seq; Type: SEQUENCE SET; Schema: test; Owner: postgres
--

SELECT pg_catalog.setval('test.employee_id_seq', 2, true);


-- Completed on 2020-03-09 11:48:49

--
-- PostgreSQL database dump complete
--

