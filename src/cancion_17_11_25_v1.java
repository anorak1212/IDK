import javax.swing.*;
import javax.sound.sampled.*;
import java.io.File;

public class cancion_17_11_25_v1 {

    static JOptionPane paneGlobal = null;
    static JDialog dialogGlobal = null;

    static final String RESET = "\u001B[0m";
    static final String ROJO = "\u001B[34m";
    static final String VERDE = "\u001B[32m";
    static final String AZUL = "\u001B[34m";

    static class Linea {
        int tiempoMs;
        String texto;
        String color;

        Linea(int tiempoMs, String texto, String color) {
            this.tiempoMs = tiempoMs;
            this.texto = texto;
            this.color = color;
        }
    }

    public static void main(String[] args) throws Exception {

        Clip clip = reproducirMusica("src\\cancion_17_11_25.wav");

        Linea[] letra = {
            new Linea(11750, "Yeh, yeh", VERDE),
            new Linea(13410, "Todavía yo te quiero", ROJO),
            new Linea(17170, "Pero sé que e'un error", ROJO),
            new Linea(20710, "Porque ya tú no me quieres", ROJO),
            new Linea(24460, "Y sin ti me va mejor", AZUL),
            new Linea(28180, "Y si veo a tu mamá", VERDE),
            new Linea(31890, "Yo le pregunto por ti", VERDE),
            new Linea(35380, "Pa ver si ya tienes a alguien", VERDE),
            new Linea(39100, "Alguien que te haga feliz", AZUL),
            new Linea(42930, "Y aquí estoy arrebatao", ROJO),
            new Linea(50510, "Pensando en toa las vece' que te lo metí", ROJO),
            new Linea(54210, "Pensando en toa las vece' que estuve pa ti", ROJO),
            new Linea(59380, "No sé por qué diablo' me engaño", ROJO),
            new Linea(63300, "Diciendo que te olvidé cuando te extraño", ROJO),
            new Linea(66350, "Solo comparto memes, ya yo no escribo nada", VERDE),
            new Linea(70060, "Y no he borrao tu foto, solo la puse privada", VERDE),
            new Linea(76060, "Maldito año nuevo y lo que me trajo", ROJO),
            new Linea(79450, "Me botaron del trabajo por estar mirando pa abajo", ROJO),
            new Linea(82680, "Pensando en ti siempre cabizbajo", ROJO),
            new Linea(84520, "Me veo gordito, nada que rebajo", VERDE),
            new Linea(86520, "No sé por qué la vida me ultrajo", ROJO),
            new Linea(88530, "Pensando coger un atajo", ROJO),
            new Linea(90180, "Conocí a alguien, pero no sé, nunca encajo", VERDE),
            new Linea(94230, "Al meno' que sea' tú", AZUL),
            new Linea(99000, "Baby, te quiero aunque diga lo contrario", ROJO),
            new Linea(102620, "Llevo sei' mese' solitario", ROJO),
            new Linea(104573, "Hoy salí con lo' muchacho' a beber", VERDE),
            new Linea(108978, "Y dije que de ti no iba hablar", VERDE),
            new Linea(112957, "Son las cinco, ya va amanecer", VERDE),
            new Linea(116725, "Si no prenden, la voy a llamar", VERDE),
            new Linea(120059, "Hoy salí con lo' muchacho' a beber", VERDE),
            new Linea(124453, "Y dije que de ti no iba hablar", VERDE),
            new Linea(128837, "Son las cinco, ya va amanecer", VERDE),
            new Linea(132206, "Si no prenden, la voy a llamar", VERDE),
            new Linea(135546, "Todavía yo te quiero", ROJO),
            new Linea(138893, "Pero sé que e'un error", ROJO),
            new Linea(142265, "Porque ya tú no me quieres", ROJO),
            new Linea(146444, "Y sin ti me va mejor", AZUL),
            new Linea(150000, "Y si veo a tu mamá", VERDE),
            new Linea(153376, "Yo le pregunto por ti", VERDE),
            new Linea(157027, "Pa ver si ya tienes a alguien", VERDE),
            new Linea(161001, "Alguien que te haga feliz", AZUL)
        };

        long inicio = System.currentTimeMillis();

        for (Linea l : letra) {

            long ahora = System.currentTimeMillis() - inicio;
            long faltante = l.tiempoMs - ahora;

            if (faltante > 0)
                Thread.sleep(faltante);

            System.out.println(l.color + l.texto + RESET);

            mostrarPanelAviso(l.texto);
        }

        while (clip.isRunning()) {
            Thread.sleep(100);
        }

        System.exit(0);
    }

    public static void mostrarPanelAviso(String msg) {
        if (paneGlobal == null) {
            paneGlobal = new JOptionPane(
                msg,
                JOptionPane.INFORMATION_MESSAGE,
                JOptionPane.DEFAULT_OPTION
            );

            dialogGlobal = paneGlobal.createDialog(null, "Mensaje");
            dialogGlobal.setModal(false);
            dialogGlobal.setAlwaysOnTop(true);
            dialogGlobal.setVisible(true);

        } else {
            paneGlobal.setMessage(msg);
        }
    }

    public static Clip reproducirMusica(String archivo) {
        try {
            File f = new File(archivo);
            AudioInputStream audio = AudioSystem.getAudioInputStream(f);
            Clip clip = AudioSystem.getClip();
            clip.open(audio);
            clip.start();
            return clip;
        } catch (Exception e) {
            System.out.println("No se pudo reproducir la música: " + e.getMessage());
            return null;
        }
    }
}
 