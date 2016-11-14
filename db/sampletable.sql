USE mosaiktest;

CREATE TABLE IF NOT EXISTS menschen (
  name    VARCHAR(300),
  vorname VARCHAR(300)
);

INSERT INTO mosaiktest.menschen VALUE ("aydemir", "tolga");
INSERT INTO mosaiktest.menschen VALUE ("maffay", "peter");
INSERT INTO mosaiktest.menschen VALUE ("holzberger", "christian");
INSERT INTO mosaiktest.menschen VALUE ("christus", "jesus");