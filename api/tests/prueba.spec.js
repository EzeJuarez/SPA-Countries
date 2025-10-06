const regExp = require('../src/utils/regExp');

describe("Expresión regular para nombre", () => {
  it("No debe estar vacío", () => {
    expect(regExp.nameRegExp("")).toBe(false);
    expect(regExp.nameRegExp(" ")).toBe(false);
  });
  it("Debe recibir letras", () => {
    expect(regExp.nameRegExp(123)).toBe(false);
    expect(regExp.nameRegExp("Ski")).toBe(true);
    expect(regExp.nameRegExp("Mountain bike")).toBe(true);
  });
});

describe("Expresión regular para la dificultad", () => {
  it("Debe recibir un número del 1 al 5", () => {
    expect(regExp.difficultyRegExp(-1)).toBe(false);
    expect(regExp.difficultyRegExp(0)).toBe(false);
    expect(regExp.difficultyRegExp(1)).toBe(true);
    expect(regExp.difficultyRegExp(3)).toBe(true);
    expect(regExp.difficultyRegExp(5)).toBe(true);
    expect(regExp.difficultyRegExp(6)).toBe(false);
    expect(regExp.difficultyRegExp(10)).toBe(false);
    expect(regExp.difficultyRegExp(15)).toBe(false);
  });
});

describe("Expresión regular para la duración", () => {
  it("Debe recibir un número positivo de máximo 4 dígitos", () => {
    expect(regExp.durationRegExp(-10)).toBe(false);
    expect(regExp.durationRegExp(0)).toBe(false);
    expect(regExp.durationRegExp(1)).toBe(true);
    expect(regExp.durationRegExp(120)).toBe(true);
    expect(regExp.durationRegExp(1440)).toBe(true);
    expect(regExp.durationRegExp(10080)).toBe(false);
  });
});
