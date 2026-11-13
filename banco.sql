CREATE DATABASE laboratorio_ensaios;
USE Laboratorio_ensaios;


CREATE TABLE ensaio (
  id_ensaio INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  norma VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL
);

CREATE TABLE equipamento (
  id_equipamento INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  patrimonio VARCHAR(100) NOT NULL,
  situacao VARCHAR(50) NOT NULL
);

CREATE TABLE analista (
  id_analista INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  registro VARCHAR(100) NOT NULL,
  especialidade VARCHAR(100) NOT NULL
);