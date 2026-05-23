import { useUser } from "@/services/queries";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Globe, Mail, Phone, Quote, User } from "lucide-react";
import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { dateFormat } from "@/utlls";

function Footer() {
  return (
    <footer className="flex w-full flex-col lg:flex-row relative bottom-0 left-0 gap-10 lg:gap-100 justify-center px-4 py-4 items-center  shadow-lg border-b border-border-subtle backdrop-blur-lg mt-4">
      <div className="w-full lg:w-[30%]">
        <Card className="w-78.75 py-5 px-3 max-w-sm border-0 shadow-[none]  bg-bg-surface border-bg-elevated rounded-2xl mx-auto">
          <CardHeader className="w-auto flex flex-col gap-4 justify-center">
            <Suspense
              fallback={
                <Skeleton className="h-25 w-25 bg-gray-400 rounded-full" />
              }
            >
              <CardAvatar />
            </Suspense>
            <div className="flex flex-col justify-center">
              <Suspense
                fallback={
                  <Skeleton className="w-12.5  h-2 bg-gray-400 rounded-2xl" />
                }
              >
                <CardHeading1 />
              </Suspense>
              <Suspense
                fallback={
                  <Skeleton className="w-9  h-2 bg-gray-400 rounded-2xl" />
                }
              >
                <CardHeading2 />
              </Suspense>
            </div>
          </CardHeader>
          <CardContent className="text-text-secondary">
            <Suspense>
              <Bio />
            </Suspense>
          </CardContent>
          <CardFooter className="flex-col gap-5">
            <div className="flex flex-wrap w-full gap-3">
              {["frontend", "css", "react", "javascript", "vue"].map(
                (tag, i) => (
                  <Badge className="border-accent-muted rounded-md p-3" key={i}>
                    #{tag}
                  </Badge>
                ),
              )}
            </div>
            <div className="flex justify-between px-2 w-full">
              <Suspense>
                <GithubLink />
              </Suspense>
              <a href="mailto:gabibola955@gmail.com">
                <Mail />
              </a>
              <a href="https://gabrielbolarinwa.vercel.app">
                <Globe />
              </a>
              <a href="tel:+2349135976371">
                <Phone />
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-col gap-5 w-full lg:w-[50%]">
        <Quote size={50} className="rotate-y-200" fill="#fff" />{" "}
        <span className="pl-3">
          Code is how I build, design is how I communicate, Impact is why I do
          it.
        </span>{" "}
        <span className="text-right mr-3 font-script text-3xl">
          — Bolarinwa Gabriel
        </span>
      </div>
    </footer>
  );
}

export default Footer;

function GithubLink() {
  const user = useUser().data;
  return (
    <a href={user.html_url}>
      <SiGithub />
    </a>
  );
}

function CardHeading2() {
  const user = useUser().data;
  const accountCreatedDate = new Date(user.created_at);

  return (
    <p>
      <span className="flex gap-3">
        <span>@{user.login.toLocaleLowerCase()}</span> ∙{" "}
        <span>{dateFormat(accountCreatedDate)}</span>
      </span>
    </p>
  );
}

function CardHeading1() {
  const user = useUser().data;
  return <p className="font-bold text-lg">{user.login}</p>;
}

function CardAvatar() {
  const user = useUser().data;
  return (
    <Avatar className={"rounded-full text-xl h-25 w-25"}>
      <AvatarImage src={user.avatar_url} alt={user.login} />
      <AvatarFallback
        className={
          "bg-text-primary text-bg-base text-xl! rounded-full px-[0.45rem]"
        }
      >
        <User height={50} width={50} className={"text-text-secondary"}></User>
      </AvatarFallback>
    </Avatar>
  );
}

function Bio() {
  const user = useUser().data;
  return <>{user.bio}</>;
}
