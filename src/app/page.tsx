"use client";

import { useState, useEffect } from "react";
import { 
  Heart, Brain, Sparkles, CheckCircle2, ArrowRight, RotateCcw, TrendingUp, 
  Moon, Sun, Smile, Frown, Meh, Clock, Dumbbell, ShieldAlert, Users, 
  Coffee, Utensils, BookOpen, Music, Home, Calendar, X, Check, AlertTriangle,
  Phone, MessageCircle, Video, Mail, Star, Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Tipos
interface QuizQuestion {
  id: number;
  question: string;
  options: { text: string; value: number; icon: any }[];
}

interface QuizResult {
  score: number;
  level: string;
  message: string;
  tips: string[];
  color: string;
  icon: any;
  date: string;
}

interface RoutineItem {
  time: string;
  activity: string;
  icon: any;
  description: string;
  duration: string;
}

interface Exercise {
  name: string;
  description: string;
  duration: string;
  difficulty: "Fácil" | "Moderado" | "Intenso";
  location: "Casa" | "Academia" | "Ambos";
  benefits: string[];
}

interface ContentToAvoid {
  category: string;
  icon: any;
  examples: string[];
  why: string;
  alternative: string;
}

interface SocialConnection {
  type: string;
  icon: any;
  description: string;
  tips: string[];
  frequency: string;
}

interface UserReview {
  name: string;
  avatar: string;
  initials: string;
  rating: number;
  date: string;
  review: string;
  highlight: string;
}

// Avaliações de Usuários
const userReviews: UserReview[] = [
  {
    name: "Ana Paula Silva",
    avatar: "",
    initials: "AP",
    rating: 5,
    date: "Há 2 semanas",
    review: "O MindEase mudou minha rotina completamente. Antes eu acordava ansiosa e sem direção. Agora tenho uma rotina estruturada que me ajuda a começar o dia com calma e propósito.",
    highlight: "Rotina estruturada que trouxe paz"
  },
  {
    name: "Carlos Eduardo",
    avatar: "",
    initials: "CE",
    rating: 5,
    date: "Há 1 mês",
    review: "Estava passando por um momento difícil no trabalho e me sentia esgotado. O quiz me ajudou a identificar que eu precisava de ajuda profissional. Hoje faço terapia e uso o app diariamente para manter meu equilíbrio.",
    highlight: "Me ajudou a buscar ajuda profissional"
  },
  {
    name: "Mariana Costa",
    avatar: "",
    initials: "MC",
    rating: 5,
    date: "Há 3 semanas",
    review: "Adoro a seção de exercícios! Comecei com a yoga para iniciantes e hoje já faço treino funcional. Minha ansiedade diminuiu muito e me sinto mais confiante.",
    highlight: "Exercícios que realmente funcionam"
  },
  {
    name: "Roberto Almeida",
    avatar: "",
    initials: "RA",
    rating: 5,
    date: "Há 5 dias",
    review: "A parte sobre conteúdos a evitar foi um divisor de águas. Eu passava horas no celular vendo notícias ruins e não percebia como isso afetava meu humor. Agora limito meu tempo e me sinto muito melhor.",
    highlight: "Consciência sobre consumo digital"
  },
  {
    name: "Juliana Mendes",
    avatar: "",
    initials: "JM",
    rating: 5,
    date: "Há 1 semana",
    review: "Estava me sentindo sozinha e isolada. As dicas de conexões sociais me motivaram a retomar contato com amigos e participar de um grupo de leitura. Minha vida social melhorou muito!",
    highlight: "Reconectei com pessoas queridas"
  },
  {
    name: "Pedro Henrique",
    avatar: "",
    initials: "PH",
    rating: 5,
    date: "Há 2 meses",
    review: "Uso o MindEase todos os dias há 2 meses. O progresso que vejo no histórico me motiva a continuar cuidando da minha saúde mental. É incrível ver a evolução!",
    highlight: "Acompanhamento do progresso motivador"
  }
];

// Perguntas do Quiz
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Como você tem se sentido nos últimos dias?",
    options: [
      { text: "Muito bem, energizado(a)", value: 3, icon: Smile },
      { text: "Normal, estável", value: 2, icon: Meh },
      { text: "Um pouco para baixo", value: 1, icon: Frown },
    ],
  },
  {
    id: 2,
    question: "Como está sua qualidade de sono?",
    options: [
      { text: "Durmo bem e acordo descansado(a)", value: 3, icon: Moon },
      { text: "Durmo razoavelmente", value: 2, icon: Meh },
      { text: "Tenho dificuldade para dormir", value: 1, icon: Frown },
    ],
  },
  {
    id: 3,
    question: "Você tem conseguido realizar suas atividades diárias?",
    options: [
      { text: "Sim, com facilidade", value: 3, icon: CheckCircle2 },
      { text: "Sim, mas com algum esforço", value: 2, icon: Meh },
      { text: "Tenho dificuldade", value: 1, icon: Frown },
    ],
  },
  {
    id: 4,
    question: "Como está seu nível de ansiedade?",
    options: [
      { text: "Baixo, me sinto tranquilo(a)", value: 3, icon: Smile },
      { text: "Moderado, às vezes me preocupo", value: 2, icon: Meh },
      { text: "Alto, me sinto ansioso(a) frequentemente", value: 1, icon: Frown },
    ],
  },
  {
    id: 5,
    question: "Você tem praticado autocuidado?",
    options: [
      { text: "Sim, regularmente", value: 3, icon: Heart },
      { text: "Às vezes", value: 2, icon: Meh },
      { text: "Raramente ou nunca", value: 1, icon: Frown },
    ],
  },
];

// Rotina Diária Equilibrada
const dailyRoutine: RoutineItem[] = [
  {
    time: "07:00",
    activity: "Despertar Consciente",
    icon: Sun,
    description: "Acorde devagar, alongue-se na cama, respire fundo 3 vezes",
    duration: "10 min"
  },
  {
    time: "07:30",
    activity: "Café da Manhã Nutritivo",
    icon: Coffee,
    description: "Refeição balanceada com frutas, proteínas e carboidratos",
    duration: "20 min"
  },
  {
    time: "08:00",
    activity: "Exercício Físico",
    icon: Dumbbell,
    description: "Caminhada, yoga ou treino leve para energizar o corpo",
    duration: "30 min"
  },
  {
    time: "09:00",
    activity: "Trabalho/Estudos Focados",
    icon: BookOpen,
    description: "Período de alta produtividade, evite distrações",
    duration: "2-3 horas"
  },
  {
    time: "12:00",
    activity: "Almoço e Pausa",
    icon: Utensils,
    description: "Refeição completa, mastigue devagar, descanse 15 min",
    duration: "45 min"
  },
  {
    time: "15:00",
    activity: "Pausa para Respirar",
    icon: Heart,
    description: "5 minutos de respiração profunda ou meditação rápida",
    duration: "5 min"
  },
  {
    time: "18:00",
    activity: "Conexão Social",
    icon: Users,
    description: "Converse com amigos, família ou faça atividade em grupo",
    duration: "1 hora"
  },
  {
    time: "20:00",
    activity: "Jantar Leve",
    icon: Utensils,
    description: "Refeição mais leve para facilitar o sono",
    duration: "30 min"
  },
  {
    time: "21:00",
    activity: "Relaxamento",
    icon: Music,
    description: "Leitura, música suave, hobby relaxante",
    duration: "1 hora"
  },
  {
    time: "22:30",
    activity: "Preparação para Dormir",
    icon: Moon,
    description: "Desligue telas, ambiente escuro, temperatura agradável",
    duration: "30 min"
  }
];

// Exercícios Físicos
const exercises: Exercise[] = [
  {
    name: "Caminhada Matinal",
    description: "Caminhe em ritmo moderado ao ar livre ou em esteira",
    duration: "20-30 min",
    difficulty: "Fácil",
    location: "Ambos",
    benefits: ["Melhora humor", "Aumenta energia", "Reduz ansiedade", "Melhora sono"]
  },
  {
    name: "Yoga para Iniciantes",
    description: "Posturas simples focadas em respiração e alongamento",
    duration: "15-20 min",
    difficulty: "Fácil",
    location: "Casa",
    benefits: ["Reduz estresse", "Aumenta flexibilidade", "Melhora concentração", "Equilibra emoções"]
  },
  {
    name: "Alongamento Completo",
    description: "Série de alongamentos para todo o corpo",
    duration: "10-15 min",
    difficulty: "Fácil",
    location: "Casa",
    benefits: ["Alivia tensões", "Melhora postura", "Reduz dores", "Relaxa músculos"]
  },
  {
    name: "Treino Funcional",
    description: "Exercícios com peso corporal: agachamentos, flexões, prancha",
    duration: "25-30 min",
    difficulty: "Moderado",
    location: "Ambos",
    benefits: ["Fortalece corpo", "Aumenta resistência", "Melhora autoestima", "Libera endorfina"]
  },
  {
    name: "Dança Livre",
    description: "Dance suas músicas favoritas sem compromisso",
    duration: "15-20 min",
    difficulty: "Fácil",
    location: "Casa",
    benefits: ["Diversão garantida", "Libera tensões", "Melhora humor", "Expressão criativa"]
  },
  {
    name: "Respiração Profunda",
    description: "Exercícios de respiração diafragmática e consciente",
    duration: "5-10 min",
    difficulty: "Fácil",
    location: "Ambos",
    benefits: ["Reduz ansiedade", "Acalma mente", "Melhora foco", "Regula emoções"]
  }
];

// Conteúdos a Evitar
const contentToAvoid: ContentToAvoid[] = [
  {
    category: "Notícias Negativas em Excesso",
    icon: AlertTriangle,
    examples: [
      "Noticiários 24h de tragédias e crimes",
      "Feeds de redes sociais com conteúdo pessimista",
      "Grupos de WhatsApp com notícias alarmistas"
    ],
    why: "Exposição constante a notícias negativas aumenta ansiedade, estresse e sensação de impotência",
    alternative: "Limite a 15-30 min/dia de notícias, escolha fontes confiáveis, foque em soluções"
  },
  {
    category: "Comparação Social",
    icon: Users,
    examples: [
      "Perfis que mostram apenas 'vida perfeita'",
      "Conteúdo que gera inveja ou inadequação",
      "Grupos focados em competição e status"
    ],
    why: "Comparação constante diminui autoestima e gera sentimentos de inferioridade",
    alternative: "Siga perfis inspiradores e autênticos, pratique gratidão pelo que você tem"
  },
  {
    category: "Conteúdo Violento ou Perturbador",
    icon: ShieldAlert,
    examples: [
      "Vídeos de violência explícita",
      "Filmes/séries muito pesados antes de dormir",
      "Discussões agressivas online"
    ],
    why: "Afeta qualidade do sono, aumenta irritabilidade e pode causar pesadelos",
    alternative: "Escolha entretenimento leve à noite, evite debates acalorados online"
  },
  {
    category: "Doomscrolling",
    icon: Phone,
    examples: [
      "Rolar feeds infinitamente sem propósito",
      "Checar redes sociais compulsivamente",
      "Consumir conteúdo passivamente por horas"
    ],
    why: "Desperdiça tempo, aumenta ansiedade, prejudica sono e produtividade",
    alternative: "Defina horários específicos para redes sociais, use timer, faça pausas conscientes"
  }
];

// Conexões Sociais Saudáveis
const socialConnections: SocialConnection[] = [
  {
    type: "Conversas Profundas",
    icon: MessageCircle,
    description: "Diálogos significativos com pessoas que você confia",
    tips: [
      "Reserve tempo de qualidade sem distrações",
      "Pratique escuta ativa e empática",
      "Compartilhe sentimentos verdadeiros",
      "Faça perguntas abertas e genuínas"
    ],
    frequency: "2-3x por semana"
  },
  {
    type: "Atividades em Grupo",
    icon: Users,
    description: "Participe de grupos com interesses em comum",
    tips: [
      "Aulas de dança, esportes ou artes",
      "Grupos de leitura ou estudos",
      "Voluntariado em causas que você apoia",
      "Clubes de hobbies (fotografia, culinária, etc)"
    ],
    frequency: "1-2x por semana"
  },
  {
    type: "Videochamadas com Distantes",
    icon: Video,
    description: "Mantenha contato com quem está longe",
    tips: [
      "Agende chamadas regulares com família/amigos",
      "Faça 'cafés virtuais' descontraídos",
      "Compartilhe momentos do dia a dia",
      "Celebre conquistas juntos, mesmo à distância"
    ],
    frequency: "1x por semana"
  },
  {
    type: "Apoio Mútuo",
    icon: Heart,
    description: "Construa relações de reciprocidade e suporte",
    tips: [
      "Ofereça ajuda sem esperar retorno imediato",
      "Peça ajuda quando precisar (não é fraqueza!)",
      "Celebre conquistas dos outros genuinamente",
      "Esteja presente em momentos difíceis"
    ],
    frequency: "Sempre que necessário"
  },
  {
    type: "Limites Saudáveis",
    icon: ShieldAlert,
    description: "Saiba quando se afastar de relações tóxicas",
    tips: [
      "Identifique relações que drenam sua energia",
      "Aprenda a dizer 'não' sem culpa",
      "Reduza contato com pessoas negativas",
      "Priorize quem te respeita e valoriza"
    ],
    frequency: "Avaliação contínua"
  }
];

// Função para calcular resultado
const calculateResult = (score: number): QuizResult => {
  const maxScore = quizQuestions.length * 3;
  const percentage = (score / maxScore) * 100;

  if (percentage >= 80) {
    return {
      score: percentage,
      level: "Excelente",
      message: "Você está em um ótimo momento emocional! Continue cuidando de si mesmo(a).",
      tips: [
        "Mantenha sua rotina de autocuidado",
        "Compartilhe suas práticas positivas com amigos",
        "Continue praticando gratidão diariamente",
      ],
      color: "from-emerald-400 to-teal-600",
      icon: Sparkles,
      date: new Date().toISOString(),
    };
  } else if (percentage >= 60) {
    return {
      score: percentage,
      level: "Bom",
      message: "Você está bem, mas há espaço para melhorias no seu bem-estar emocional.",
      tips: [
        "Reserve 10 minutos diários para meditação",
        "Pratique exercícios físicos leves",
        "Mantenha contato com pessoas queridas",
        "Estabeleça uma rotina de sono regular",
      ],
      color: "from-blue-400 to-cyan-600",
      icon: TrendingUp,
      date: new Date().toISOString(),
    };
  } else {
    return {
      score: percentage,
      level: "Precisa de atenção",
      message: "Parece que você está passando por um momento difícil. Lembre-se: está tudo bem pedir ajuda.",
      tips: [
        "Considere conversar com um profissional de saúde mental",
        "Pratique respiração profunda quando se sentir ansioso(a)",
        "Faça pequenas pausas durante o dia",
        "Conecte-se com amigos ou familiares",
        "Estabeleça metas pequenas e alcançáveis",
      ],
      color: "from-purple-400 to-pink-600",
      icon: Heart,
      date: new Date().toISOString(),
    };
  }
};

export default function MindEase() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "quiz" | "result" | "resources">("home");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [history, setHistory] = useState<QuizResult[]>([]);

  // Carregar histórico do localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("mindease-history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Salvar resultado no localStorage
  const saveResult = (newResult: QuizResult) => {
    const updatedHistory = [newResult, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem("mindease-history", JSON.stringify(updatedHistory));
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = newAnswers.reduce((sum, val) => sum + val, 0);
      const quizResult = calculateResult(totalScore);
      setResult(quizResult);
      saveResult(quizResult);
      setCurrentScreen("result");
    }
  };

  const resetQuiz = () => {
    setCurrentScreen("home");
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Header Global */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-purple-900/30 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentScreen("home")}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MindEase
              </h1>
            </button>
            
            <nav className="flex gap-2">
              <Button
                variant={currentScreen === "home" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentScreen("home")}
                className={currentScreen === "home" ? "bg-gradient-to-r from-purple-600 to-pink-600" : ""}
              >
                <Home className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Início</span>
              </Button>
              <Button
                variant={currentScreen === "resources" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentScreen("resources")}
                className={currentScreen === "resources" ? "bg-gradient-to-r from-purple-600 to-pink-600" : ""}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Recursos</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Home Screen */}
      {currentScreen === "home" && (
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12 space-y-4">
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Seu espaço seguro de autocuidado emocional
              </p>
            </div>

            {/* Main Card */}
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mb-8">
              <CardHeader className="text-center space-y-4 pb-8">
                <div className="flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full">
                    <Heart className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <CardTitle className="text-2xl md:text-3xl">Como você está se sentindo hoje?</CardTitle>
                <CardDescription className="text-base md:text-lg">
                  Faça nosso quiz rápido de bem-estar emocional e receba dicas personalizadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl text-center">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                    <h3 className="font-semibold mb-1">5 Perguntas</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Rápido e simples</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl text-center">
                    <Brain className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-semibold mb-1">Análise Personalizada</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Resultado detalhado</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl text-center">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-semibold mb-1">Dicas Práticas</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Para seu dia a dia</p>
                  </div>
                </div>

                <Button
                  onClick={() => setCurrentScreen("quiz")}
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg py-6"
                >
                  Começar Quiz
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => setCurrentScreen("resources")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Rotina Equilibrada
                  </CardTitle>
                  <CardDescription>
                    Organize seu dia com hábitos saudáveis
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => setCurrentScreen("resources")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-emerald-600" />
                    Exercícios Físicos
                  </CardTitle>
                  <CardDescription>
                    Atividades simples para corpo e mente
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => setCurrentScreen("resources")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-orange-600" />
                    Conteúdos a Evitar
                  </CardTitle>
                  <CardDescription>
                    Proteja sua saúde mental digital
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => setCurrentScreen("resources")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Conexões Sociais
                  </CardTitle>
                  <CardDescription>
                    Fortaleça relações saudáveis
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Avaliações de Usuários */}
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mb-8">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-2xl md:text-3xl">O que nossos usuários dizem</CardTitle>
                <CardDescription className="text-base">
                  Histórias reais de pessoas que transformaram sua saúde mental
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userReviews.map((review, index) => (
                    <Card key={index} className="border-2 border-purple-100 dark:border-purple-900/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <CardHeader className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12 border-2 border-purple-200">
                            <AvatarImage src={review.avatar} alt={review.name} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-semibold">
                              {review.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold">{review.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="relative">
                          <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-200 dark:text-purple-800" />
                          <p className="text-sm text-gray-700 dark:text-gray-300 pl-6 italic">
                            "{review.review}"
                          </p>
                        </div>
                        <div className="pt-3 border-t border-purple-100 dark:border-purple-900/30">
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs">
                            {review.highlight}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Histórico */}
            {history.length > 0 && (
              <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Seu Progresso
                  </CardTitle>
                  <CardDescription>Últimas avaliações realizadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {history.slice(0, 3).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-700 dark:to-purple-900/20 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Badge className={`bg-gradient-to-r ${item.color} text-white border-0`}>
                            {item.level}
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(item.date).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <span className="font-semibold text-lg">{Math.round(item.score)}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Resources Screen */}
      {currentScreen === "resources" && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="routine" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-xl">
                <TabsTrigger value="routine" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                  <Clock className="w-4 h-4 mr-2" />
                  Rotina
                </TabsTrigger>
                <TabsTrigger value="exercises" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white">
                  <Dumbbell className="w-4 h-4 mr-2" />
                  Exercícios
                </TabsTrigger>
                <TabsTrigger value="avoid" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
                  <ShieldAlert className="w-4 h-4 mr-2" />
                  Evitar
                </TabsTrigger>
                <TabsTrigger value="social" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                  <Users className="w-4 h-4 mr-2" />
                  Social
                </TabsTrigger>
              </TabsList>

              {/* Rotina Diária */}
              <TabsContent value="routine" className="space-y-6">
                <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-blue-600" />
                      Rotina Diária Equilibrada
                    </CardTitle>
                    <CardDescription>
                      Um dia estruturado para melhor saúde mental e produtividade
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dailyRoutine.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={index} className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl hover:shadow-md transition-shadow">
                            <div className="flex-shrink-0">
                              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-lg">{item.activity}</h3>
                                <Badge variant="outline" className="text-xs">{item.time}</Badge>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                {item.description}
                              </p>
                              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                ⏱️ {item.duration}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Exercícios Físicos */}
              <TabsContent value="exercises" className="space-y-6">
                <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Dumbbell className="w-6 h-6 text-emerald-600" />
                      Exercícios para Corpo e Mente
                    </CardTitle>
                    <CardDescription>
                      Atividades físicas que melhoram seu bem-estar emocional
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {exercises.map((exercise, index) => (
                        <Card key={index} className="border-2 border-emerald-100 dark:border-emerald-900/30 hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-lg">{exercise.name}</CardTitle>
                              <Badge className={
                                exercise.difficulty === "Fácil" ? "bg-green-500" :
                                exercise.difficulty === "Moderado" ? "bg-yellow-500" :
                                "bg-orange-500"
                              }>
                                {exercise.difficulty}
                              </Badge>
                            </div>
                            <CardDescription>{exercise.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-emerald-600" />
                                {exercise.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Home className="w-4 h-4 text-emerald-600" />
                                {exercise.location}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Benefícios:</h4>
                              <div className="space-y-1">
                                {exercise.benefits.map((benefit, i) => (
                                  <div key={i} className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <span>{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Conteúdos a Evitar */}
              <TabsContent value="avoid" className="space-y-6">
                <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <ShieldAlert className="w-6 h-6 text-orange-600" />
                      Conteúdos e Notícias a Evitar
                    </CardTitle>
                    <CardDescription>
                      Proteja sua saúde mental limitando exposição a conteúdos prejudiciais
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {contentToAvoid.map((content, index) => {
                        const IconComponent = content.icon;
                        return (
                          <Card key={index} className="border-2 border-orange-100 dark:border-orange-900/30">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-lg">
                                <IconComponent className="w-5 h-5 text-orange-600" />
                                {content.category}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                  <X className="w-4 h-4 text-red-500" />
                                  Exemplos a evitar:
                                </h4>
                                <ul className="space-y-1 ml-6">
                                  {content.examples.map((example, i) => (
                                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400 list-disc">
                                      {example}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                <h4 className="font-semibold text-sm mb-1">Por que evitar?</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{content.why}</p>
                              </div>
                              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                                <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                                  <Check className="w-4 h-4 text-emerald-600" />
                                  Alternativa saudável:
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{content.alternative}</p>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Conexões Sociais */}
              <TabsContent value="social" className="space-y-6">
                <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Users className="w-6 h-6 text-purple-600" />
                      Conexões Sociais Saudáveis
                    </CardTitle>
                    <CardDescription>
                      Fortaleça relações significativas e construa uma rede de apoio
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {socialConnections.map((connection, index) => {
                        const IconComponent = connection.icon;
                        return (
                          <Card key={index} className="border-2 border-purple-100 dark:border-purple-900/30 hover:shadow-lg transition-shadow">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                  <IconComponent className="w-5 h-5 text-purple-600" />
                                  {connection.type}
                                </CardTitle>
                                <Badge variant="outline" className="text-xs">
                                  {connection.frequency}
                                </Badge>
                              </div>
                              <CardDescription>{connection.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {connection.tips.map((tip, i) => (
                                  <div key={i} className="flex items-start gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">{tip}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Contatos de Emergência */}
                <Card className="shadow-xl border-0 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                      <Phone className="w-5 h-5" />
                      Precisa de Ajuda Profissional?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Se você está em crise ou precisa de apoio imediato:
                    </p>
                    <div className="space-y-2">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <p className="font-semibold">CVV - Centro de Valorização da Vida</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Ligue 188 (24h, gratuito)</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <p className="font-semibold">CAPS - Centro de Atenção Psicossocial</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Busque o CAPS mais próximo de você</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}

      {/* Quiz Screen */}
      {currentScreen === "quiz" && (
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-sm">
                      Pergunta {currentQuestion + 1} de {quizQuestions.length}
                    </Badge>
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <h2 className="text-xl md:text-2xl font-semibold text-center">
                  {quizQuestions[currentQuestion].question}
                </h2>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(option.value)}
                        variant="outline"
                        className="w-full h-auto py-4 px-6 text-left justify-start hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 hover:border-purple-300 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4 w-full">
                          <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg group-hover:scale-110 transition-transform">
                            <IconComponent className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="text-base flex-1">{option.text}</span>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Result Screen */}
      {currentScreen === "result" && result && (
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${result.color}`} />
              <CardHeader className="text-center space-y-4 pb-6">
                <div className="flex justify-center">
                  <div className={`p-6 bg-gradient-to-br ${result.color} rounded-full shadow-lg`}>
                    <result.icon className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div>
                  <Badge className={`bg-gradient-to-r ${result.color} text-white border-0 text-lg px-4 py-1 mb-3`}>
                    {result.level}
                  </Badge>
                  <CardTitle className="text-3xl md:text-4xl mb-2">
                    {Math.round(result.score)}% de Bem-estar
                  </CardTitle>
                  <CardDescription className="text-base md:text-lg">
                    {result.message}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    Dicas Personalizadas para Você
                  </h3>
                  <div className="space-y-3">
                    {result.tips.map((tip, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg"
                      >
                        <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm md:text-base">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={resetQuiz}
                    variant="outline"
                    className="flex-1 border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  >
                    <RotateCcw className="mr-2 w-4 h-4" />
                    Fazer Novamente
                  </Button>
                  <Button
                    onClick={() => setCurrentScreen("resources")}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    <BookOpen className="mr-2 w-4 h-4" />
                    Ver Recursos
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardContent className="p-6">
                <p className="text-center text-sm md:text-base text-gray-700 dark:text-gray-300">
                  💙 Lembre-se: cuidar da sua saúde mental é um ato de coragem e amor próprio. 
                  Se precisar de ajuda profissional, não hesite em buscar apoio.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
