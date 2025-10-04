-- Criação da tabela Tipo
CREATE TABLE Tipo (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    DESCRICAO VARCHAR(255) NOT NULL
);

-- Criação da tabela Treino
CREATE TABLE Treino (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    DATA_HORA DATETIME NOT NULL,
    DESCRICAO VARCHAR(255) NOT NULL,
    TIPO_ID INT NOT NULL,
    FOREIGN KEY (TIPO_ID) REFERENCES Tipo(ID)
);

-- Inserção de dados iniciais na tabela Tipo
INSERT INTO Tipo (DESCRICAO) VALUES
('Corrida'),
('Pedal'),
('Caminhada');